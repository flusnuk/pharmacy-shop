import HeroSection from './components/home/HeroSection';
import Categories from './components/home/Categories';
import PopularProducts from './components/home/PopularProducts';
import PromoSection from './components/home/PromoSection';
import ContactInfo from './components/home/ContactInfo';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <PopularProducts />
      <PromoSection />
      <ContactInfo />
    </main>
  );
}
