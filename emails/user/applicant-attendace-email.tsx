import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ApplicantAttendanceEmailProps {
  image: string;
  name: string;
  eventTitle: string;
  campany: string;
  eventId: string;
}

export default function ApplicantAttendanceEmail({
  image,
  name,
  eventTitle,
  campany,
  eventId,
}: ApplicantAttendanceEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        イベント参加完了通知
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://utfs.io/f/eb68581f-f2c3-447d-9115-b475cf34d022-yiuhbj.png"
            width="170"
            height="50"
            alt="Koala"
            style={logo}
          />
          <Text style={paragraph} >{name} 様、</Text>
          <Text style={paragraph}>
            {eventTitle}へのご参加ありがとうございます。{campany}からEventi履歴書アンケートが送信されましたのでご回答ください。
          </Text>
          <Img
            src={image}
            width="320"
            height="180"
            alt="サムネイル"
            style={logo}
          />
          <Text style={title}>
            {eventTitle}
          </Text>
          <Text style={paragraph}>
            Eventi履歴書アンケートに答える
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`"https://eventi.jp/events/${eventId}"`}>
              回答へ移動
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Eventi team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Copyright &copy;2024 Eventi Inc. All rights revered.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  height: "100%",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const title = {
  fontSize: "24px",
  lineHeight: "26px",
  textAlign: "center" as const,
}

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#eab308",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};