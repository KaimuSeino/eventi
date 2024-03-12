import React, { useCallback, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';
import Image from 'next/image';
import Slider from 'rc-slider/lib/Slider';
import pica from 'pica';
import 'rc-slider/assets/index.css';
import { useUploadThing } from "@/lib/uploadthing";
import { z } from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  image: z.string()
})

interface Props {
  previewIcon: File | null;
  onChangePreviewIcon: (iconFile: File | null) => void;
  onChangeIcon: (iconFile: File) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

const ICON_WIDTH = 160 as const;
const ICON_HEIGHT = 160 as const;

export const IconEditor: React.FC<Props> = (props: Props) => {
  const { previewIcon, onChangeIcon, onChangePreviewIcon, onSubmit } = props;
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);

  const [uploading, isUploading] = useState(false)

  const { startUpload } = useUploadThing("iconImage", {
    onClientUploadComplete: (res) => {
      console.log("startUpload")
      // アップロードが完了したら、得られたURLでonSubmitを呼び出す
      const uploadedImageUrl = res?.[0].url;
      onSubmit({ image: uploadedImageUrl });
    },
  });

  const handleClickFileSave = useCallback(async () => {
    if (!editorRef.current) return;
    isUploading(true)

    const img = editorRef.current.getImage();
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.width = ICON_WIDTH;
    canvas.height = ICON_HEIGHT;
    const picaCanvas = await pica().resize(img, canvas, { alpha: true });

    picaCanvas.toBlob(async (blob) => {
      const nextFile = new File([blob!], previewIcon?.name!, {
        type: previewIcon?.type,
        lastModified: Date.now(),
      });
      // ここで startUploadを呼び出し、アップロードを開始する
      await startUpload([nextFile])
      handleCloseIsOpen();
      isUploading(false)
    });

  }, [previewIcon, startUpload]);

  const handleCloseIsOpen = useCallback(() => {
    onChangePreviewIcon(null);
  }, [onChangePreviewIcon]);

  const handleChangeScale = useCallback((value: number) => {
    setScale(value);
  }, []);

  return (
    <Modal
      isOpen={!!previewIcon}
      onRequestClose={handleCloseIsOpen}
      ariaHideApp={false}
      overlayClassName={{
        base: "overlayBase",
        afterOpen: "overlayAfter",
        beforeClose: "overlayBefore",
      }}
      className={{
        base: "contentBase",
        afterOpen: "contentAfter",
        beforeClose: "contentBefore",
      }}
      closeTimeoutMS={500}
    >
      <div className="flex justify-end pb-[10px]">
        <button onClick={handleCloseIsOpen} type="button">
          <Image
            width={48}
            height={48}
            src="/close.svg"
            alt="アイコン編集閉じる"
          />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <AvatarEditor
            ref={editorRef}
            image={previewIcon ? URL.createObjectURL(previewIcon) : ''}
            width={ICON_WIDTH}
            height={ICON_HEIGHT}
            borderRadius={100}
            color={[255, 255, 255, 0.8]}
            scale={scale}
            rotate={0}
          />
          <div className="pt-[10px]">
            <Slider
              onChange={handleChangeScale}
              min={1}
              max={5}
              step={0.01}
              defaultValue={1}
            />
          </div>
          <div className="flex justify-center pt-[30px]">
            <Button disabled={uploading} type="button" onClick={handleClickFileSave}>保存する</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};