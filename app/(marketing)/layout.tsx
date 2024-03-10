import Footer from "./_components/footer";
import Header from "./_components/header";

const HomePageLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HomePageLayout;