import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <div className="position-relative w-full h-full p-0 -mt-10">
      <h1 className="home-font position-absolute top-50 start-50 translate-middle z-50">Hi</h1>
      <Carousel />
    </div>
  );
}
