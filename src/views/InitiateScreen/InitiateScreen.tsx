import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Card from '../../components/Card';
import LabeledTextInput from '../../components/LabeledTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import SectionTitle from '../../components/SectionTitle';
import { useInitiateViewModel } from '../../viewModels/useInitiateViewModel';
import { colors } from '../../theme/colors';
import { texts } from '../../constants/texts';
import { styles } from '../../styles/views/InitiateScreen.styles';
import { formatDateTime } from '../../util/DateTimeFormat';

const InitiateScreen = () => {
  const views = useInitiateViewModel();

  useEffect(() => {
    views.getModelLimitHandler();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <Icon
              name="activity"
              size={22}
              color={colors.textOnPrimary}
              style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>{texts.appTitle}</Text>
          </View>
          <TouchableOpacity
            style={styles.historyButton}
            activeOpacity={0.8}
            onPress={views.onOpenHistory}
          >
            <Icon name="clock" size={20} color={colors.textOnPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Select AI Model */}
        <SectionTitle title={texts.sectionSelectModel} />
        <View style={styles.modelRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flex: 1, marginRight: 10 }}
            onPress={() => views.onSelectModel('JR')}
          >
            <Card
              style={[
                styles.modelCard,
                views.selectedModel === 'JR' && styles.modelCardSelected,
              ]}
            >
              {views.selectedModel === 'JR' && (
                <View style={styles.modelSelectedTick}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              )}
              <Text style={styles.modelTitle}>🧪 JR PathoAI</Text>
              <Text style={styles.modelSubtitle}>For junior residents</Text>
              <View style={styles.usageBarContainer}>
                <View style={styles.usageBarBg} />
                <View
                  style={[
                    styles.usageBarFill,
                    {
                      width: `${
                        (views.modalLimitData.jrUsed /
                          views.modalLimitData.jrLimit) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.usageText}>
                {`${views.modalLimitData.jrUsed}/${views.modalLimitData.jrLimit}`}{' '}
                used today
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flex: 1 }}
            onPress={() => views.onSelectModel('SR')}
          >
            <Card
              style={[
                styles.modelCard,
                styles.modelCardRight,
                views.selectedModel === 'SR' && styles.modelCardSelected,
              ]}
            >
              {views.selectedModel === 'SR' && (
                <View style={styles.modelSelectedTick}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              )}
              <Text style={styles.modelTitle}>🧬 SR PathoAI</Text>
              <Text style={styles.modelSubtitle}>For senior residents</Text>
              <View style={styles.usageBarContainer}>
                <View style={styles.usageBarBg} />
                <View
                  style={[
                    styles.usageBarFill,
                    {
                      width: `${
                        (views.modalLimitData.srUsed /
                          views.modalLimitData.srLimit) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.usageText}>
                {`${views.modalLimitData.srUsed}/${views.modalLimitData.srLimit}`}{' '}
                used today
              </Text>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Upload */}
        <SectionTitle title={texts.sectionUploadSlide} />
        <Card style={styles.uploadCard}>
          {!views.hasImage ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.uploadDashed}
              onPress={views.onUpload}
            >
              <Icon name="image" size={32} color={colors.primaryLight} />
              <Text style={styles.uploadText}>{texts.uploadButton}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.imageContainer}>
              {views.imageUri && (
                <Image
                  source={{ uri: views.imageUri.imageUri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.changeButton}
                onPress={views.onUpload}
              >
                <Text style={styles.changeButtonText}>
                  {texts.uploadChangeButton}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Details */}
        <SectionTitle title={texts.sectionAnalysisDetails} />
        <LabeledTextInput
          label={texts.organLabel}
          required
          placeholder={texts.organPlaceholder}
          value={views.organ}
          onChangeText={views.setOrgan}
        />
        <LabeledTextInput
          label={texts.clinicalLabel}
          placeholder={texts.clinicalPlaceholder}
          value={views.clinicalContext}
          onChangeText={views.setClinicalContext}
          multiline
        />

        <PrimaryButton
          label={views.isAnalyzing ? texts.analyzing : texts.analyze}
          disabled={!views.canAnalyze}
          onPress={views.onAnalyze}
        />

        {/* Results */}
        {views.showResult && (
          <View style={styles.resultsContainer}>
            <SectionTitle title={texts.sectionAnalysisResults} />
            <Card>
              <Text style={styles.resultLabel}>{texts.observationsLabel}</Text>
              <Text style={styles.resultBody}>
                {views.showResult.observation}
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.preliminaryDiagnosisLabel}
              </Text>
              <Text style={styles.resultValue}>
                {views.showResult.preliminaryDiagnosis}
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.confidenceLabel}
              </Text>
              <Text style={[styles.resultValue, styles.resultValueSuccess]}>
                {views.showResult.confidenceLevel}
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.disclaimerLabel}
              </Text>
              <Text style={styles.disclaimer}>
                {views.showResult.disclaimer}
              </Text>

              <PrimaryButton
                label={texts.newAnalysis}
                onPress={views.onNewAnalysis}
                style={styles.newAnalysisButton}
                labelStyle={styles.newAnalysisLabel}
              />
            </Card>
          </View>
        )}

        {views.showResult && (
          <>
            <PrimaryButton
              label={'Feedback'}
              onPress={views.onOpenFeedback}
              style={{ marginBottom: 10 }}
              leftIcon={
                <Icon
                  name="message-square"
                  size={18}
                  color={colors.textOnPrimary}
                />
              }
            />
            <PrimaryButton
              label={views.isSharing ? texts.sharePreparing : texts.shareReport}
              onPress={views.onShareReport}
              disabled={views.isSharing}
              leftIcon={
                <Icon name="share-2" size={18} color={colors.textOnPrimary} />
              }
            />
          </>
        )}

        <Modal
          transparent
          animationType="slide"
          visible={views.isHistoryVisible}
          onRequestClose={views.onCloseHistory}
        >
          <View style={styles.historyOverlay}>
            <View style={styles.historySheet}>
              <View style={styles.historyHeaderRow}>
                <Text style={styles.historyTitle}>{texts.historyTitle}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={views.onCloseHistory}
                >
                  <Icon name="x" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.historyList}
                showsVerticalScrollIndicator={false}
              >
                {views.history.length === 0 ? (
                  <Text style={styles.historyEmptyText}>
                    {texts.historyEmpty}
                  </Text>
                ) : (
                  views.history.map(item => (
                    <View key={item.id} style={styles.historyItem}>
                      <Text style={styles.historyItemMeta}>
                        {formatDateTime(item.createdAt)} •{' '}
                        {item.model === 'JR' ? 'JR PathoAI' : 'SR PathoAI'}
                      </Text>

                      <Text style={styles.historyItemLabel}>
                        {texts.organLabel}
                      </Text>
                      <Text style={styles.historyItemTitle}>
                        {item.organ || '-'}
                      </Text>

                      <Text style={styles.historyItemLabel}>
                        {texts.clinicalLabel}
                      </Text>
                      <Text style={styles.historyItemContext}>
                        {item.clinicalContext || '-'}
                      </Text>

                      <Text style={styles.historyItemLabel}>
                        {texts.observationsLabel}
                      </Text>
                      <Text style={styles.historyItemContext}>
                        {item.observation}
                      </Text>

                      <Text style={styles.historyItemLabel}>
                        {texts.preliminaryDiagnosisLabel}
                      </Text>
                      <Text style={styles.historyItemContext}>
                        {texts.preliminaryDiagnosisValue}
                      </Text>

                      <Text style={styles.historyItemLabel}>
                        {texts.confidenceLabel}
                      </Text>
                      <Text style={styles.historyItemContext}>
                        {texts.confidenceValue}
                      </Text>

                      {item.feedback ? (
                        <View style={styles.historyFeedbackContainer}>
                          <View style={styles.historyFeedbackStars}>
                            {[1, 2, 3, 4, 5].map(i => (
                              <Ionicons
                                key={i}
                                name={
                                  i <= (item.feedback?.rating || 0)
                                    ? 'star'
                                    : 'star-outline'
                                }
                                size={16}
                                color={
                                  i <= (item.feedback?.rating || 0)
                                    ? colors.primary
                                    : colors.borderMuted
                                }
                                style={{ marginRight: 4 }}
                              />
                            ))}
                          </View>

                          <Text style={styles.historyFeedbackNotes}>
                            Feedback: {item.feedback?.notes || '-'}
                          </Text>
                        </View>
                      ) : null}

                      <Text style={styles.historyImageBadge}>
                        Image: {item.slideImage ? 'Attached' : 'Not attached'}
                      </Text>
                      {item.slideImage ? (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${item.slideImage}`,
                          }}
                          style={styles.historyThumb}
                          resizeMode="cover"
                        />
                      ) : null}
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Feedback Modal */}
        <Modal
          transparent
          animationType="slide"
          visible={views.feedbackVisible}
          onRequestClose={views.onCloseFeedback}
        >
          <View style={styles.historyOverlay}>
            <View style={styles.feedbackSheet}>
              <View style={styles.historyHeaderRow}>
                <Text style={styles.historyTitle}>Feedback</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={views.onCloseFeedback}
                >
                  <Icon name="x" size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 8 }}>
                <Text style={{ marginBottom: 8, color: colors.textSecondary }}>
                  Rate the result
                </Text>
                <View style={styles.starRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.8}
                      onPress={() => views.setFeedbackRating(i)}
                      style={styles.starTouchable}
                    >
                      <Ionicons
                        name={
                          i <= views.feedbackRating ? 'star' : 'star-outline'
                        }
                        size={28}
                        color={
                          i <= views.feedbackRating
                            ? colors.primary
                            : colors.borderMuted
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <LabeledTextInput
                  label={'Notes'}
                  placeholder={'Add notes (optional)'}
                  multiline
                  value={views.feedbackNotes}
                  onChangeText={views.setFeedbackNotes}
                />

                <View style={styles.feedbackButtons}>
                  <PrimaryButton
                    label={'Cancel'}
                    onPress={views.onCloseFeedback}
                    style={styles.feedbackCancel}
                    labelStyle={{ color: colors.primary }}
                  />
                  <PrimaryButton
                    label={'Submit'}
                    onPress={views.onSubmitFeedback}
                    style={styles.feedbackSubmit}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {views.isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        >
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};
export default InitiateScreen;
