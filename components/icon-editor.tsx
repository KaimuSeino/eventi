import { useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import pica from "pica"
import Modal from 'react-modal';
import Image from "next/image";
import Slider from "rc-slider/lib/Slider";
import 'rc-slider/assets/index.css';

interface IconEditorProps {
  previewIcon: File | null;
  onChangePreviewIcon: (iconFile: File | null) => void;
  onChangeIcon: (iconFile: File | null) => void;
}

const ICON_WIDTH = 180 as const;
const ICON_HEIGHT = 180 as const;

export const IconEditor = ({
  previewIcon,
  onChangePreviewIcon,
  onChangeIcon,
}: IconEditorProps) => {
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);

  const handleClickFileSave = useCallback(async () => {
    if (!editorRef.current) return;

    const img = editorRef.current.getImage();
    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.width = ICON_WIDTH;
    canvas.height = ICON_HEIGHT;
    const picaCanvas = await pica().resize(img, canvas, { alpha: true })

    picaCanvas.toBlob((blob) => {
      console.log(blob)
      const nextFile = new File([blob!], previewIcon?.name!, {
        type: previewIcon?.type,
        lastModified: Date.now(),
      });
      onChangeIcon(nextFile);
      handleCloseIsOpen();
    });
  }, [previewIcon, onChangeIcon])

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
        base: 'overlayBase', // 基本のクラス
        afterOpen: 'overlayAfter', // モーダルが開いた後に適用されるクラス
        beforeClose: 'overlayBefore' // モーダルが閉じる前に適用されるクラス
      }}
      className={{
        base: 'contentBase', // 基本のクラス
        afterOpen: 'contentAfter', // コンテンツが表示された後に適用されるクラス
        beforeClose: 'contentBefore' // コンテンツが閉じる前に適用されるクラス
      }}
      closeTimeoutMS={500}
    >
      <div className="flex justify-end pb-[10px]">
        <button onClick={handleCloseIsOpen} type="button">
          <Image
            width={48}
            height={48}
            src="/close.svg"
            alt="アイコン編集を閉じる"
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
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
          <div className="pt-[10px]">
            <Slider
              onChange={handleChangeScale}
              min={1}
              max={1.5}
              step={0.01}
              defaultValue={1}
            />
          </div>
          <div className="flex justify-center pt-[30px]">
            <button type="button" onClick={handleClickFileSave} className="cursor-pointer">
              確定
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}