import PageWrapper from '../components/wrapper/page-wrapper';


export default function NotFound() {
  return (
    <PageWrapper>
      <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='font-extrabold text-5xl'>Oops!</h1>
        <p>You must be finding something, too bad we don't have that!</p>
      </div>
    </PageWrapper>
  );
}
