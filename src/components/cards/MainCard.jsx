import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
import { tokens } from '../../theme';

const headerSX = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
      const colors = tokens(theme.palette.mode);
          console.log("palette", theme.palette)

    return (
      <Box
        ref={ref}
        {...others}
        sx={{
          border: border ? `1px solid ${colors.primary[200]}25` : 'none',
          borderRadius: 1,
          p: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'none',
          ...sx
        }}
      >
        {title && (
          <Box sx={headerSX}>
            <Typography variant={darkTitle ? 'h3' : 'h5'}>{title}</Typography>
            {secondary}
          </Box>
        )}
        {title && <Divider sx={{ my: 1 }} />}

        {content ? (
          <Box sx={contentSX} className={contentClass}>
            {children}
          </Box>
        ) : (
          children
        )}
      </Box>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
