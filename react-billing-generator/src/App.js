import { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import InvoiceDocument from './components/InvoiceDocument';
import { PDFViewer } from '@react-pdf/renderer';

function App() {
  
  const [formData, setFormData] = useState({
    logo: "",
    shopName: "",
    address: "",
    buyerName: "",
    phone: "",
    footer: "",
    items: [
      {name: "Sample Item", quantity: 1, price: 10.00}
    ]
  })

  const [finalInvoiceData, setFinalInvoiceData] = useState({})

  const [showPDF, setShowPDF] = useState(false)

  const handleGeneratePDF = () => {
    setFinalInvoiceData(formData)
    setShowPDF(true)
  }

  return (
    <div className='flex flex-col md:flex-row gap-6 p-6'>
      <div className='w-full md:w-1/2'>
        <InputForm invoiceData={formData} setInvoiceData={setFormData} />
        <button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg' onClick={handleGeneratePDF} >
          Generate PDF
        </button>
      </div>
      <div className='w-full md:w-1/2 h-[90vh] border shadow rounded'>
      {showPDF && (
      <PDFViewer width="100%" height="100%">
        <InvoiceDocument {...finalInvoiceData} key={JSON.stringify(finalInvoiceData.items)} />
      </PDFViewer>
      )}
      </div>
    </div>
  );
}

export default App;
