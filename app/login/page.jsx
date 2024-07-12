"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1>Depression Quiz</h1>
        <div className='subtitle'>Assess Your Mental Health</div>
        <div className='description'>
          This quiz is designed to help you evaluate your symptoms of depression. 
          Answer the questions truthfully to get the most accurate results.
        </div>
        <Link href='/quiz'>
          <button>Start Quiz</button>
        </Link>
        <div className='footer'>Powered by Hansith Fonseka</div>
      </div>
    </main>
  );
}



