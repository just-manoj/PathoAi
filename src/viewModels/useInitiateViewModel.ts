import { useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';

import { texts } from '../constants/texts';
import { ModelType } from '../types/model';
import { analyzeApi, feedbackApi, historyApi, modelLimitApi } from '../service';

type AnalysisHistoryItem = {
  id: string;
  slideImage: string;
  organ: string;
  model: ModelType;
  clinicalContext: string;
  observation: string;
  preliminaryDiagnosis: string;
  confidenceLevel: string;
  disclaimer: string;
  feedback: { id: string; rating: number; notes: string } | null;
  createdAt: string;
};

type ResultType = {
  id: string;
  slideImage: string;
  organ: string;
  clinicalContext: string;
  model: string;
  observation: string;
  preliminaryDiagnosis: string;
  confidenceLevel: string;
  disclaimer: string;
  createdAt: string;
  feedback?: { id: string; rating: number; notes: string } | null;
};

type Image = {
  fileName: string;
  type: string;
  imageUri: string;
};

export const useInitiateViewModel = () => {
  const [modalLimitData, setModalLimitData] = useState({
    jrUsed: 0,
    srUsed: 0,
    jrLimit: 0,
    srLimit: 0,
  });
  const [selectedModel, setSelectedModel] = useState<ModelType>('SR');
  const [organ, setOrgan] = useState('');
  const [clinicalContext, setClinicalContext] = useState('');
  const [imageUri, setImageUri] = useState<Image | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState<ResultType | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Feedback modal state
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');

  const hasImage = !!imageUri;

  const canAnalyze = useMemo(
    () => !!organ.trim() && hasImage && !isAnalyzing,
    [organ, hasImage, isAnalyzing],
  );

  const handleSelectModel = (model: ModelType) => {
    setSelectedModel(model);
  };

  const getModelLimitHandler = async () => {
    setIsLoading(true);
    const res = await modelLimitApi();
    if (res.status) {
      setModalLimitData({ ...res.data });
      setIsLoading(false);
    } else {
      Alert.alert('Error', res.message);
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      const asset = result.assets?.[0];
      console.log('ass', asset);

      if (asset?.uri) {
        setImageUri({
          imageUri: asset.uri,
          fileName: asset.fileName || 'slide.jpg',
          type: asset.type || 'image/jpeg',
        });
      }
    } catch (e) {
      // Could be surfaced via UI later
      console.warn('Image pick failed', e);
    }
  };

  const handleAnalyze = async () => {
    if (!canAnalyze) {
      return;
    }
    if (!imageUri) {
      Alert.alert('Validation error', 'Pick a image for analysis');
      return;
    }
    if (!organ) {
      Alert.alert('Validation error', 'Enter the organ type for analysis');
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('slideImage', {
      uri: imageUri.imageUri,
      name: imageUri.fileName,
      type: imageUri.type,
    });
    formData.append('organ', organ);
    formData.append('clinicalContext', clinicalContext);
    formData.append('model', selectedModel);

    const res = await analyzeApi(formData);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    if (res.status) {
      setShowResult({
        ...res.data,
      });
      setIsAnalyzing(false);
      getModelLimitHandler();
    } else {
      Alert.alert('Error', res.message);
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setOrgan('');
    setClinicalContext('');
    setImageUri(null);
    setShowResult(null);
  };

  const handleShareReport = async () => {
    if (isSharing) {
      return;
    }

    try {
      setIsSharing(true);

      const now = new Date();
      const formattedDateTime = now.toLocaleString();

      const imageSection = imageUri
        ? `
          <h2>Slide Image</h2>
          <div class="image-wrapper">
            <img src="${imageUri.imageUri}" />
          </div>
        `
        : '';

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: -apple-system, Roboto, Helvetica, Arial, sans-serif; padding: 12px; background: #f4f7fb; }
              h1 { font-size: 18px; margin-bottom: 2px; color: #153a5b; }
              h2 { font-size: 14px; margin-top: 10px; margin-bottom: 4px; color: #153a5b; border-bottom: 1px solid #d5e2f0; padding-bottom: 3px; }
              p { font-size: 11px; line-height: 1.35; margin: 0 0 3px 0; color: #1e3550; }
              .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
              .logo { font-size: 12px; font-weight: 700; color: #1b76ff; letter-spacing: 0.8px; text-transform: uppercase; }
              .meta { font-size: 10px; color: #5a6b82; text-align: right; }
              .pill { display: inline-block; padding: 3px 8px; border-radius: 999px; background:#E7F3FB; font-size: 11px; color: #24527a; margin-top: 4px; }
              .card { background: #ffffff; border-radius: 10px; padding: 10px 12px; margin-top: 6px; box-shadow: 0 1px 2px rgba(15, 35, 52, 0.06); }
              .row { display: flex; margin-bottom: 3px; }
              .row-label { width: 95px; font-size: 11px; font-weight: 600; color: #4a5b72; }
              .row-value { flex: 1; font-size: 11px; color: #1e3550; }
              .tag { display: inline-block; padding: 1px 6px; border-radius: 999px; font-size: 10px; font-weight: 600; }
              .tag-green { background: #e5f7ed; color: #1a7f3c; }
              .disclaimer { font-size: 10px; color: #6a7a90; line-height: 1.4; }
              .image-wrapper { margin-top: 6px; display: flex; justify-content: center; }
              .image-wrapper img { max-width: 160px; max-height: 160px; border-radius: 14px; object-fit: cover; border: 1px solid #d5e2f0; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="logo">PathoAI</div>
                <h1>Screening Report</h1>
              </div>
              <div class="meta">
                <div>${formattedDateTime}</div>
              </div>
            </div>

            <p class="pill">Model ${
              selectedModel === 'JR' ? 'JR PathoAI' : 'SR PathoAI'
            }</p>

            <h2>Case Details</h2>
            <div class="card">
              <div class="row">
                <div class="row-label">${texts.organLabel}</div>
                <div class="row-value">${organ || '-'}</div>
              </div>
              <div class="row">
                <div class="row-label">${texts.clinicalLabel}</div>
                <div class="row-value">${clinicalContext || '-'}</div>
              </div>
            </div>

            ${imageSection}

            <h2>${texts.observationsLabel.replace(':', '')}</h2>
            <div class="card">
              <p>${showResult?.observation}</p>
            </div>

            <h2>${texts.preliminaryDiagnosisLabel.replace(':', '')}</h2>
            <div class="card">
              <p><strong>${showResult?.preliminaryDiagnosis}</strong></p>
            </div>

            <h2>${texts.confidenceLabel.replace(':', '')}</h2>
            <div class="card">
              <span class="tag tag-green">${showResult?.confidenceLevel}</span>
            </div>

            <h2>${texts.disclaimerLabel.replace(':', '')}</h2>
            <div class="card">
              <p class="disclaimer">${showResult?.disclaimer}</p>
            </div>
          </body>
        </html>
      `;

      const pdf = await generatePDF({
        html,
        fileName: 'pathoai-screening-report',
        base64: false,
      });

      if (!pdf.filePath) {
        return;
      }

      const url =
        Platform.OS === 'android' ? `file://${pdf.filePath}` : pdf.filePath;

      await Share.open({
        url,
        type: 'application/pdf',
      });
    } catch (e) {
      console.warn('Share report failed', e);
    } finally {
      setIsSharing(false);
    }
  };

  const handleOpenHistory = async () => {
    setIsLoading(true);
    const res = await historyApi();
    if (res.status) {
      setHistory(res.data);
      setIsHistoryVisible(true);
      setIsLoading(false);
    } else {
      Alert.alert('Error', res.message);
      setHistory([]);
      setIsLoading(false);
    }
  };

  const handleCloseHistory = () => {
    setIsHistoryVisible(false);
  };

  const handleOpenFeedback = () => {
    setFeedbackVisible(true);
  };

  const handleCloseFeedback = () => {
    setFeedbackVisible(false);
    setFeedbackRating(0);
    setFeedbackNotes('');
  };

  const handleSubmitFeedback = async () => {
    setIsLoading(true);
    if (!feedbackRating) {
      Alert.alert('Validation error', 'Must add rating');
      return;
    }

    if (!feedbackNotes) {
      Alert.alert('Validation error', 'Must add your note');
      return;
    }

    if (!showResult) {
      return;
    }

    const res = await feedbackApi(
      showResult?.id,
      feedbackRating,
      feedbackNotes,
    );

    if (res.status) {
      handleCloseFeedback();
      Alert.alert('Success', res.message);
    } else {
      Alert.alert('Success', res.message);
    }
  };

  return {
    selectedModel,
    organ,
    clinicalContext,
    imageUri,
    hasImage,
    isAnalyzing,
    showResult,
    isSharing,
    history,
    isHistoryVisible,
    canAnalyze,
    modalLimitData,
    isLoading,
    setOrgan,
    setClinicalContext,
    onSelectModel: handleSelectModel,
    onUpload: handleUpload,
    onAnalyze: handleAnalyze,
    onNewAnalysis: handleNewAnalysis,
    onShareReport: handleShareReport,
    onOpenHistory: handleOpenHistory,
    onCloseHistory: handleCloseHistory,
    onOpenFeedback: handleOpenFeedback,
    onCloseFeedback: handleCloseFeedback,
    onSubmitFeedback: handleSubmitFeedback,
    feedbackVisible,
    feedbackRating,
    feedbackNotes,
    setFeedbackRating,
    setFeedbackNotes,
    getModelLimitHandler,
  };
};
