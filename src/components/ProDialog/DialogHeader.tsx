import { Close, type SvgIconComponent } from '@mui/icons-material';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '../IconButton/IconButton';
import { Tooltip, useMediaQuery } from '@mui/material';

interface Props extends BoxProps {
  title: string;
  icon?: SvgIconComponent;
  description?: string;
  onClose:() => void;
  toolTip?: string;
}

const DialogHeader = (props: Props) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const { title, icon: Icon, children, description, onClose, toolTip, ...rest } = props;
  return (
    <Wrapper {...rest}>
      {Icon && (
        <Icon
          sx={{
            mt: 3,
            p: 1.2,
            background: '#f5f5f5',
            borderRadius: '50%',
            fontSize: 45,
            color: '#7c7d7f',
          }}
        />
      )}
      {children && children}
      {md ? (
        <Tooltip title={toolTip}>
          <Typography
            noWrap
            sx={{ 
              fontWeight: 600, fontSize: 17, 
              mt: 1, ml:2,
              maxWidth: 180,
              overflow: 'hidden',
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer", 
            }} 
            color='#121828' gutterBottom
          >
            {title}
          </Typography>
        </Tooltip>
      ) : (
        <Typography sx={{ fontWeight: 600, fontSize: 17, mt: 1, ml:2 }} color='#121828' gutterBottom>
          {title}
        </Typography>        
      )}

      <IconButton 
        handleFunt={onClose}
        icon={<Close sx={{ mr:2, color: '#1C1A1B'}}/>}
        backgroundColor='white'
      />
      {description && <Typography variant='subtitle2'>{description}</Typography>}
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'start',
  borderColor: theme.palette.divider,
}));

export default DialogHeader;
