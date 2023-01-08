import { useState } from 'react';
import Login from '../components/entry-forms/login';
import SignUp from '../components/entry-forms/signup';
import Modal from '../components/portal/modal';
import PageWrapper from '../components/wrapper/page-wrapper';

export default function Entry() {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  return (
    <PageWrapper>
      <div className='h-screen flex justify-around items-center px-32'>
        <div className='flex flex-col items-start gap-4'>
          <h1 className='font-extrabold text-5xl text-blue-600'>Socialex</h1>
          <p className='w-[32rem] text-2xl'>
            Komunekta sa iyong mga kaibigan at sa mundong nakapaligid sa iyo sa
            Socialex.
          </p>
        </div>
        <div className='bg-zinc-900 flex flex-col items-center p-4 rounded-md shadow-lg w-[26rem]'>
          <Login />
          <button
            className='bg-[#2B831A] p-4 rounded-md font-extrabold my-2'
            onClick={() => setOpenSignUpModal(true)}
          >
            Create new account
          </button>
          <Modal
            visible={openSignUpModal}
            handleClose={() => setOpenSignUpModal(false)}
          >
            <SignUp onSignUpSuccess={() => setOpenSignUpModal(false)} />
          </Modal>
        </div>
      </div>
    </PageWrapper>
  );
}
