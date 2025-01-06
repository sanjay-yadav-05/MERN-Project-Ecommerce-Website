// import React from 'react'
// import Head from './Head'
// import Foot from './Foot'
// import { Helmet } from 'react-helmet'
// const layout = ({ children ,title,desc,keywords}) => {
//     return (
//         <div>
//             <Helmet>
//                 <meta http-equiv="X-UA-Compatible" content="IE=7" />
//                 <meta name="keywords" content={keywords} />
//                 <meta name="description" content={desc} />
//                 <title>{title}</title>
//             </Helmet>
//             <Head />
//             <main className='fixed top-[8vh] h-[85vh]'>
//                 {children}
//             </main>
//             <Foot />
//         </div>
//     )
// }

// layout.defaultProps = {
//     title: 'Brandname - shop now',
//     desc: 'shopping Hub',
//     keywords: 'shopping, online, store, offers, best price',
// }

// export default layout

import React from 'react';
import Head from './Head';
import Foot from './Foot';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, title, desc, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta http-equiv="X-UA-Compatible" content="IE=7" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={desc} />
        <title>{title}</title>
      </Helmet>
      <Head />
      <ToastContainer/>
      <main className='relative top-[8vh] h-[85vh] w-screen'>
        {children}
      </main>
      <Foot />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Brandname - shop now',
  desc: 'Shopping Hub',
  keywords: 'shopping, online, store, offers, best price',
};

export default Layout;
