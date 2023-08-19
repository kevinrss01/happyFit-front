export default function Modal({ visible, close, footer, body, title = 'Modal header' }) {
   if (!visible) return <></>
   console.log('render')
   const defaultFooter = <button onClick={close}>Fermer</button>

   const BodyComponent = body
   const FooterComponent = footer

   return (
      <div className='modal' onClick={close}>
         <div className='modal-content' onClick={(event) => event.stopPropagation()}>
            <div className='modal-header'>
               <h3 className='text-black'>{title}</h3>
            </div>
            <div className='modal-body'>{body && <BodyComponent />}</div>
            <div className='modal-footer'>
               {footer && <FooterComponent />}
               {defaultFooter}
            </div>
         </div>
      </div>
   )
}
