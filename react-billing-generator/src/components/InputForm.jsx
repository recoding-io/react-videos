import React, { useState } from "react"

export default function InputForm({invoiceData, setInvoiceData}) {

  const [item, setItem] = useState({name: '', quantity: '', price: ''})

    const handleInputChange = (e) => {
      const {name, value, type, files} = e.target
      if (type === 'file'){
        const file = files[0]
        if (file){
          const reader = new FileReader()
          reader.onloadend = () => {
            setInvoiceData(prev => ({...prev, logo: reader.result}))
          }
          reader.readAsDataURL(file)
        }
      } else {
        setInvoiceData(prev => ({...prev, [name]: value}))
      }
    }

    const handleItemChange = (e) => {
      const {name, value} = e.target
      setItem(prev=> ({...prev, [name]: value}))
    }

    const addItem = () => {
      if (!item.name || !item.price || isNaN(parseFloat(item.price))) return;

      setInvoiceData(prev => ({
        ...prev,
        items: [...prev.items, {...item}]
      }))
      setItem({name: '', quantity: '', price: ''})
    }
    
    return (
        <div className="space-y-4">
        <h3 className='text-4xl font-bold text-gray-800'>
            Billing Information
        </h3>
        <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
            <input
        type="file"
        name="logo"
        accept="image/*"
        onChange={handleInputChange}
        />
    {invoiceData.logo && (
    <img
        src={invoiceData.logo}
        alt="Logo Preview"
        className="h-16 w-16 object-contain border rounded"
    />
    )}

     <label className="block text-sm font-medium text-gray-700">Shop Name</label>
      <input className='w-full p-2 border-2 border-solid border-gray-800' name="shopName" value={invoiceData.shopName} onChange={handleInputChange} placeholder="Shop Name" />
      <label className="block text-sm font-medium text-gray-700">Address</label>
      <input className='w-full p-2 border-2 border-solid border-gray-800' name="address" value={invoiceData.address} onChange={handleInputChange} placeholder="Address" />
      <label className='block text-sm font-medium text-gray-700'>Buyer Name</label>
      <input className='w-full p-2 border-2 border-solid border-gray-800' name="buyerName" value={invoiceData.buyerName} onChange={handleInputChange} placeholder="Buyer Name" />
      <label className="block text-sm font-medium text-gray-700">Phone</label>
      <input className='w-full p-2 border-2 border-solid border-gray-800' name="phone" value={invoiceData.phone} onChange={handleInputChange} placeholder="Phone Number" />
      <label className="block text-sm font-medium text-gray-700">Footer</label>
      <input className='w-full p-2 border-2 border-solid border-gray-800' name="footer" value={invoiceData.footer} onChange={handleInputChange} placeholder="Footer" />
      
      <div className="pt-4 space-y-2">
        <input className="border-2 border-solid p-2 m-2" name="name" value={item.name} onChange={handleItemChange} placeholder="Item Name" />
        <input className="border-2 border-solid p-2 m-2" name="quantity" value={item.quantity} onChange={handleItemChange} placeholder="Quantity" />
        <input className="border-2 border-solid p-2 m-2" name="price" value={item.price} onChange={handleItemChange} placeholder="Price" />
        <button type="button" onClick={addItem} className="btn bg-blue-600 px-6 py-2 rounded-lg text-white">Add Item</button>
      </div>


{invoiceData.items && invoiceData.items.length > 0 && (
        <div className="pt-4">
          <h3 className="font-bold mb-2">Added Items:</h3>
          <ul className="space-y-1">
            {invoiceData.items.map((itm, idx) => (
              <li key={idx} className="flex gap-4 border-b pb-1">
                <span className="flex-1">{itm.name}</span>
                <span className="w-16 text-right">{itm.quantity}</span>
                <span className="w-20 text-right">${parseFloat(itm.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
    )
}