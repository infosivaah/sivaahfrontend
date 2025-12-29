export const generateWhatsAppLink = (cart, form, total) => {
  const productsText = cart
    .map(
      (p) =>
        `Product: ${p.name}
Quantity: ${p.qty}
Price: ₹${p.price * p.qty}`
    )
    .join("\n\n");

  const message = `
Hello SIVAAH,

I want to buy the following product(s):

${productsText}

Customer Details:
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}
City: ${form.city}
Pincode: ${form.pincode}

Total Amount: ₹${total}

Please confirm my order.
`;

  return `https://wa.me/918090565000?text=${encodeURIComponent(
    message
  )}`;
};
