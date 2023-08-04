import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Hero from '@/components/hero/Hero';
import { load } from 'cheerio';
import { urlJellyFishMotril } from '@/constant/constants';
import { type JellyFishProps } from '@/types/types';
import DayWithEvents from '@/components/day-with-events/DayWithEvents';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';
import WeekWithEvents from '@/components/week-with-events/WeekWithEvents';

const MEDIA = [
  {
    src: '/images/fiestas-2023/17-agosto-cine.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
  {
    src: '/images/fiestas-2023/17-agosto-bingo.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
  {
    src: '/images/fiestas-2023/18-agosto-dj.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
  {
    src: '/images/fiestas-2023/18-agosto-fiesta-ibicenca.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
  {
    src: '/images/fiestas-2023/18-agosto-juegos.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
  {
    src: '/images/fiestas-2023/18-agosto-migas.jpeg',
    alt: 'Melicena',
    type: 'img',
  },
];

export async function getServerSideProps(): Promise<{ props: JellyFishProps }> {
  try {
    const response = await fetch(urlJellyFishMotril);

    if (!response.ok) {
      throw new Error('Problema al obtener la página de meduseo');
    }

    const data = await response.text();

    const $ = load(data);

    const jellyFishAmount = $(
      '#g-header > div:nth-child(1) > div > div > div > div > div > div.card > div > div > div:nth-child(1) > div > div > div > div > div > h5',
    ).text();

    // const updatedDate = $('selector-para-la-fecha-de-actualizacion').text();
    // const jellyFishImg = $('selector-para-la-imagen').attr('src');

    return {
      props: {
        jellyFishAmount,
        // updatedDate,
      },
    };
  } catch (error) {
    return {
      props: {
        error: (error as Error).message,
      },
    };
  }
}

export default function Fiestas2023Page(props: JellyFishProps) {
  return (
    <Layout marqueeData={props}>
      <Seo
        templateTitle='• Programación Fiestas Melicena 2023'
        description='Descubre qué tiene preparada la Comisión de Fiestas'
      />
      <main>
        <Hero
          title='Programación de las fiestas de Melicena de 2023'
          description='¡Preparaos que se viene una buena!'
        />
        <section
          className='mx-auto container p-4'
          aria-label='Los mejores resultados'
        >
          <h2 className='my-3 text-3xl font-bold mb-12'>Día a día</h2>

          <WeekWithEvents />

          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 4, 1200: 5 }}
          >
            <Masonry gutter={'20px'} className='masonry container mx-auto p-4'>
              {MEDIA.map((media, index) => (
                <Image
                  key={index}
                  width={600}
                  height={600}
                  alt={media.alt}
                  src={media.src}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className='rounded-lg shadow-xl object-cover brightness-90 hover:brightness-100 transition-all duration-500'
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      </main>
    </Layout>
  );
}
