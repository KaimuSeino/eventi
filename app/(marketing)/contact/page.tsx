"use client"

import Container from "../_components/container";
import Fadein from "../../../components/fadein";
import Title from "../_components/title";

const ContactPage = () => {
  return (
    <Container>

      <div className="flex flex-col gap-6 p-8">
        <Fadein>
          <Title title={"お問い合わせはこちらから"} />
        </Fadein>
        <Fadein>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="max-w-2xl">
              私たちは未来を共に築く仲間を探しています。私たちのビジョンと使命に共感し、一緒に変革を実現しましょう。
            </p>
          </div>{" "}
        </Fadein>
      </div>
    </Container>
  );
}

export default ContactPage;