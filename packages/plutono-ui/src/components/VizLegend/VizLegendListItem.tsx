import React from 'react';
import { css, cx } from 'emotion';
import { VizLegendSeriesIcon } from './VizLegendSeriesIcon';
import { VizLegendItem, SeriesColorChangeHandler } from './types';
import { VizLegendStatsList } from './VizLegendStatsList';
import { useStyles } from '../../themes';
import { PlutonoTheme } from '@credativ/plutono-data';

export interface Props {
  item: VizLegendItem;
  className?: string;
  onLabelClick?: (item: VizLegendItem, event: React.MouseEvent<HTMLDivElement>) => void;
  onSeriesColorChange?: SeriesColorChangeHandler;
}

/**
 * @internal
 */
export const VizLegendListItem: React.FunctionComponent<Props> = ({ item, onSeriesColorChange, onLabelClick }) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.itemWrapper}>
      <VizLegendSeriesIcon
        disabled={!onSeriesColorChange}
        color={item.color}
        onColorChange={(color) => {
          if (onSeriesColorChange) {
            onSeriesColorChange(item.label, color);
          }
        }}
      />
      <div
        onClick={(event) => {
          if (onLabelClick) {
            onLabelClick(item, event);
          }
        }}
        className={cx(styles.label, item.disabled && styles.labelDisabled)}
      >
        {item.label}
      </div>
      <div className={cx(item.disabled && styles.labelDisabled)}>
        {item.getDisplayValues && <VizLegendStatsList stats={item.getDisplayValues()} />}
      </div>
    </div>
  );
};

VizLegendListItem.displayName = 'VizLegendListItem';

const getStyles = (theme: PlutonoTheme) => ({
  label: css`
    label: LegendLabel;
    cursor: pointer;
    white-space: nowrap;
  `,
  labelDisabled: css`
    label: LegendLabelDisabled;
    color: ${theme.colors.linkDisabled};
  `,
  itemWrapper: css`
    display: flex;
    white-space: nowrap;
    align-items: center;
    flex-grow: 1;
  `,
  value: css`
    text-align: right;
  `,
  yAxisLabel: css`
    color: ${theme.palette.gray2};
  `,
});
