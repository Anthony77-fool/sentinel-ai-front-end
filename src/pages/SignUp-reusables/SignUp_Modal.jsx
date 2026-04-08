//Component for Modal
export function SignUp_Modal({ modal, setModal }) {

  return(

    <>

      {/* Custom Tailored Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 transform animate-in zoom-in-95 duration-200">
            {/* Flex container to put Icon and Title beside each other */}
            <div className="flex items-center gap-4 mb-4"> 
              
              {/* Icon Div - Removed mb-4 */}
              <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${modal.isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {modal.isSuccess ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                )}
              </div>

              {/* Title - Vertical alignment handled by items-center above */}
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{modal.title}</h3>
              
            </div>
              
            <p className="text-slate-500 mt-2 text-sm leading-relaxed text-center">{modal.message}</p>
            
            {!modal.isSuccess && (
              <button 
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="w-full mt-6 py-3 bg-[#89A1EF] text-white font-semibold rounded-xl hover:bg-[#768bd9] transition-colors shadow-lg shadow-[#89A1EF]/20 cursor-pointer"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      )}

    </>

  );

}