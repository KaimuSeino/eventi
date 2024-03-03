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

interface ApplicantHostEmailProps {
  image: string;
  campany: string;
  eventTitle: string;
  eventId: string;
}

export default function ApplicantHostEmail({
  image,
  campany,
  eventTitle,
  eventId,
}: ApplicantHostEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        参加申し込みのお知らせ
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
          <Text style={paragraph} >{campany} 様、</Text>
          <Text style={paragraph}>
            イベントの参加申し込みがありました。ご確認と対応をよろしくお願いします。
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
            イベント参加者一覧で確認できます。
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`https://eventi.jp/host/events/${eventId}/joining`}>
              イベント参加者一覧へ
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
  )
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