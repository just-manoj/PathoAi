import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primaryLight,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  historyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  modelRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  modelCard: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 16,
  },
  modelCardRight: {
    marginRight: 0,
  },
  modelCardSelected: {
    borderColor: colors.primary,
  },
  modelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  modelSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  usageBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  usageBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E4EEF6',
  },
  usageBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  usageText: {
    fontSize: 11,
    color: colors.textUsage,
  },
  uploadCard: {
    marginTop: 4,
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
  },
  uploadDashed: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderMuted,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.uploadBackground,
  },
  previewImage: {
    width: 170,
    height: 170,
    borderRadius: 16,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textAccent,
  },
  uploadHint: {
    marginTop: 4,
    fontSize: 12,
    color: '#6D8196',
  },
  changeButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
  },
  changeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textAccent,
  },
  resultsContainer: {
    marginTop: 24,
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  resultBody: {
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 18,
  },
  resultSpacing: {
    marginTop: 14,
  },
  resultValue: {
    fontSize: 13,
    color: colors.textBody,
  },
  resultValueSuccess: {
    color: colors.success,
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textDisclaimer,
    lineHeight: 17,
  },
  newAnalysisButton: {
    marginTop: 20,
    backgroundColor: colors.resultAltBackground,
  },
  newAnalysisLabel: {
    color: colors.textAccent,
  },
  historyOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  historySheet: {
    maxHeight: '65%',
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  feedbackSheet: {
    maxHeight: '55%',
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  historyList: {
    marginTop: 8,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  historyItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  historyItemMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  historyItemContext: {
    fontSize: 12,
    color: colors.textBody,
    marginTop: 6,
  },
  historyItemLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 6,
  },
  historyImageBadge: {
    marginTop: 4,
    fontSize: 11,
    color: colors.textSecondary,
  },
  historyThumb: {
    marginTop: 8,
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  historyEmptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
  },
  modelSelectedTick: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starTouchable: {
    marginRight: 6,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  feedbackCancel: {
    minWidth: 100,
    backgroundColor: colors.screenBackground,
    marginTop: 0,
  },
  feedbackSubmit: {
    minWidth: 100,
    alignSelf: 'flex-end',
    marginTop: 0,
  },
  existingFeedback: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
  },
  existingFeedbackTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  existingFeedbackNotes: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 18,
  },
  historyFeedbackContainer: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: colors.cardBackground,
  },
  historyFeedbackStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  historyFeedbackNotes: {
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 18,
  },
});
