import React from 'react';
import {
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

const InitiateScreen = () => {
  const views = useInitiateViewModel();

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
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                </View>
              )}
              <Text style={styles.modelTitle}>🧪 JR PathoAI</Text>
              <Text style={styles.modelSubtitle}>For junior residents</Text>
              <View style={styles.usageBarContainer}>
                <View style={styles.usageBarBg} />
                <View style={[styles.usageBarFill, { width: '15%' }]} />
              </View>
              <Text style={styles.usageText}>1/7 used today</Text>
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
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                </View>
              )}
              <Text style={styles.modelTitle}>🧬 SR PathoAI</Text>
              <Text style={styles.modelSubtitle}>For senior residents</Text>
              <View style={styles.usageBarContainer}>
                <View style={styles.usageBarBg} />
                <View style={[styles.usageBarFill, { width: '35%' }]} />
              </View>
              <Text style={styles.usageText}>2/3 used today</Text>
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
                  source={{ uri: views.imageUri }}
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
                The image shows a collection of mature adipocytes with clear
                cytoplasm and peripheral nuclei, surrounded by fibrous
                connective tissue. There is no evidence of atypical cells or
                significant inflammatory infiltrate.
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.preliminaryDiagnosisLabel}
              </Text>
              <Text style={styles.resultValue}>
                {texts.preliminaryDiagnosisValue}
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.confidenceLabel}
              </Text>
              <Text style={[styles.resultValue, styles.resultValueSuccess]}>
                {texts.confidenceValue}
              </Text>

              <Text style={[styles.resultLabel, styles.resultSpacing]}>
                {texts.disclaimerLabel}
              </Text>
              <Text style={styles.disclaimer}>{texts.disclaimerBody}</Text>

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
          <PrimaryButton
            label={views.isSharing ? texts.sharePreparing : texts.shareReport}
            onPress={views.onShareReport}
            disabled={views.isSharing}
            leftIcon={
              <Icon name="share-2" size={18} color={colors.textOnPrimary} />
            }
          />
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
                        {item.timestamp} •{' '}
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
                        The image shows a collection of mature adipocytes with
                        clear cytoplasm and peripheral nuclei, surrounded by
                        fibrous connective tissue. There is no evidence of
                        atypical cells or significant inflammatory infiltrate.
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

                      <Text style={styles.historyImageBadge}>
                        Image: {item.imageUri ? 'Attached' : 'Not attached'}
                      </Text>
                      {item.imageUri ? (
                        <Image
                          source={{ uri: item.imageUri }}
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default InitiateScreen;
