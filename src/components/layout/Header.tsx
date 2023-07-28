import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  return (
    <div className='navbar bg-base-100 container p-4 mx-auto'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>Melicena</a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <UnstyledLink href='/' className='hover:text-gray-600'>
              Inicio
            </UnstyledLink>
          </li>
          <li>
            <details>
              <summary>Sobre el pueblo</summary>
              <ul className='p-2 bg-base-100'>
                <li>
                  <a>Galería</a>
                </li>
                <li>
                  <a>Contacto</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
