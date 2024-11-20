import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

export const TextArea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    height: 100%;
    resize: none;
    `,
  );