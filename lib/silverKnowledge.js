const articles = [
  {
    slug: 'what-is-925-sterling-silver',
    title: 'What Is 925 Sterling Silver?',
    category: 'Silver Basics',
    description: 'Understand what 925 sterling silver means, why it is used in jewellery and what buyers should check.',
    answer: '925 sterling silver contains 92.5% pure silver. The remaining 7.5% is made from other metals that help make the alloy more suitable for jewellery.',
    takeaway: '925 describes silver purity: 925 parts out of 1000 are silver.',
    sections: [
      ['What does 925 mean?', 'The number 925 refers to fineness. A 925 alloy contains 92.5% silver.'],
      ['Why is sterling silver used for jewellery?', 'Jewellery needs a balance of silver content, strength and workability. Sterling silver provides high silver content while being more practical for many jewellery designs than very soft fine silver.'],
      ['Is 925 silver real silver?', 'Yes. 925 sterling silver is real silver. The 925 number describes its silver content; it does not mean the material is merely silver-coloured.'],
      ['What should you check before buying?', 'Check the stated material, product weight, dimensions, seller information, price and applicable care and order policies.']
    ],
    faq: [['Is 925 the same as pure silver?', 'No. Fine silver is generally described as 999 or 999.9 fineness, while sterling silver is 925.'], ['Can 925 silver tarnish?', 'Yes. Sterling silver can naturally tarnish when exposed to air, moisture and certain substances.']]
  },
  {
    slug: '925-silver-vs-999-fine-silver', title: '925 Silver vs 999 Fine Silver: What Is the Difference?', category: 'Silver Basics',
    description: 'Compare 925 sterling silver and 999 fine silver by purity, practical jewellery use and softness.',
    answer: '925 sterling silver contains 92.5% silver, while 999 fine silver contains about 99.9% silver. Fine silver is generally softer.', takeaway: 'Higher purity is not automatically better for every jewellery use.',
    sections: [['Purity', '925 contains 92.5% silver; 999 fine silver contains approximately 99.9% silver.'], ['Physical characteristics', 'Fine silver is softer. Sterling silver is commonly used where jewellery needs additional strength and workability.'], ['Which should you choose?', 'Choose according to the product, construction and intended use rather than purity alone.']], faq: [['Is 999 silver better?', 'Not automatically. It has higher purity but different physical characteristics.'], ['Why is 925 common in jewellery?', 'Its combination of high silver content and useful strength makes it practical for many jewellery designs.']]
  },
  {
    slug: 'does-925-silver-tarnish', title: 'Does 925 Silver Tarnish?', category: 'Silver Care',
    description: 'Learn why 925 silver tarnishes and how simple storage and care can reduce tarnishing.',
    answer: 'Yes. 925 sterling silver can tarnish naturally because the alloy reacts with substances in its environment.', takeaway: 'Tarnish is a surface reaction and is not proof that genuine silver is fake.',
    sections: [['Why does it tarnish?', 'Silver can react with compounds in air and with moisture, sweat, cosmetics and other substances.'], ['How can you reduce it?', 'Keep jewellery clean and dry, store it properly and reduce unnecessary exposure to perfumes, creams and household chemicals.'], ['Does tarnish mean poor quality?', 'No. Genuine sterling silver can tarnish. The rate depends on environment, use and storage.']], faq: [['Can I wear 925 silver every day?', 'Yes, but everyday wear increases exposure to moisture and products, so regular care becomes more important.'], ['Can rhodium-plated silver tarnish?', 'Plating can reduce direct exposure of the silver surface, but its durability depends on wear and coating condition.']]
  },
  {
    slug: 'how-to-clean-925-silver-jewellery', title: 'How to Clean 925 Silver Jewellery', category: 'Silver Care',
    description: 'A practical guide to gently cleaning sterling silver jewellery while protecting finishes and stones.',
    answer: 'For routine care, start with a soft clean cloth and gentle handling. Avoid abrasive materials and harsh chemicals unless they are known to be suitable for the specific piece.', takeaway: 'Gentle cleaning is safer than aggressive scrubbing.',
    sections: [['Routine cleaning', 'After wearing, gently wipe jewellery with a soft clean cloth to remove surface oils and moisture.'], ['For visible tarnish', 'Use a cleaning method appropriate to the jewellery and its finish. Pieces with stones or plating may need different treatment.'], ['What should you avoid?', 'Avoid abrasive materials and unverified DIY chemicals that may scratch metal, affect plating or damage stones.']], faq: [['Can I use toothpaste?', 'It is safer not to use abrasive toothpaste as a default jewellery cleaner because it can scratch some finishes.'], ['How often should I clean silver?', 'Clean it when residue or tarnish becomes noticeable and gently wipe after wear.']]
  },
  {
    slug: 'how-to-store-silver-jewellery', title: 'How to Store Silver Jewellery Properly', category: 'Silver Care',
    description: 'Simple storage practices to reduce tarnishing, scratching and tangling.',
    answer: 'Store silver jewellery clean and dry, separated from pieces that can scratch it, and with unnecessary exposure to humid air reduced.', takeaway: 'Clean, dry and separated storage is the basic rule.',
    sections: [['Keep pieces dry', 'Moisture can contribute to tarnishing and can affect some finishes. Let jewellery dry before storage.'], ['Separate pieces', 'Keep chains, rings and other pieces apart to reduce scratching, rubbing and tangling.'], ['Use a suitable box or pouch', 'A clean jewellery box or pouch protects pieces between wears. Reducing exposure to humidity can also help slow tarnishing.']], faq: [['Should silver be stored in a bathroom?', 'It is better to avoid humid bathroom storage because repeated moisture exposure can accelerate tarnishing.']]
  },
  {
    slug: 'how-to-buy-silver-jewellery', title: 'How to Buy Silver Jewellery: A Practical Buyer’s Guide', category: 'Buying Silver',
    description: 'What to check before buying silver jewellery: purity, weight, dimensions, pricing, seller information and care.',
    answer: 'Check the silver purity, product details, dimensions, weight, price, seller information, care instructions and the policies that apply to your order.', takeaway: 'Do not judge a silver jewellery piece by its price alone; understand what the price represents.',
    sections: [['Check purity', 'Confirm whether the product is 925 sterling silver, 999 fine silver or another material.'], ['Check weight and dimensions', 'Weight and dimensions make products easier to compare. Design and construction also influence the finished piece.'], ['Understand the price', 'A jewellery price can include silver value, making or craftsmanship, finishing, applicable taxes and other disclosed components.'], ['Check seller and policies', 'Know who you are buying from and read the applicable shipping, return, exchange and care policies.'], ['Buy for intended use', 'A delicate occasional-wear piece and a robust everyday piece can have different design priorities.']], faq: [['Is heavier always better?', 'No. Weight is one factor; construction, comfort, finishing and intended use also matter.'], ['Why do two 925 pieces cost differently?', 'Weight, design, craftsmanship, finishing, stones, complexity and other disclosed costs can differ.']]
  },
  {
    slug: 'what-is-making-charge-in-silver-jewellery', title: 'What Is Making Charge in Silver Jewellery?', category: 'Buying Silver',
    description: 'Understand making charges and why two silver jewellery pieces with similar silver weight can have different prices.',
    answer: 'Making charge refers to the amount associated with converting silver into a finished jewellery piece, including work and craftsmanship involved in making the design.', takeaway: 'Silver value and craftsmanship value are different components of a finished jewellery price.',
    sections: [['Silver value vs making value', 'Silver value is connected to silver quantity and the applicable rate. Making or craftsmanship reflects the work required to turn material into a finished design.'], ['Why can making charges differ?', 'Complex shapes, detailing, production methods and finishing can change the amount of work involved.'], ['Why transparency matters', 'Showing important price components helps buyers understand why two pieces made from the same material can have different final prices.']], faq: [['Is making charge the same as profit?', 'Not by itself. It can represent manufacturing and craftsmanship-related costs within a seller’s pricing structure.']]
  },
  {
    slug: 'how-silver-rate-affects-jewellery-price', title: 'How Does the Silver Rate Affect Jewellery Prices?', category: 'Buying Silver',
    description: 'Understand how silver rates and silver weight influence the material-value component of jewellery pricing.',
    answer: 'When the underlying silver rate changes, the silver-value component of jewellery can change, especially when pricing is linked directly to silver weight.', takeaway: 'Silver rate is one input into jewellery pricing, not the only component.',
    sections: [['The basic relationship', 'A known quantity of silver has a material value influenced by the applicable silver rate. A finished jewellery price can also include craftsmanship, finishing, taxes and other disclosed components.'], ['Why prices can change', 'Silver is a commodity and market rates move. A seller linking product prices to a current rate may therefore update prices.'], ['Sivaah’s transparency approach', 'Sivaah is building its pricing experience around showing customers more of the information behind a silver jewellery price, including product weight and silver-rate context where applicable.']], faq: [['Does a higher silver rate automatically raise the final price by the same percentage?', 'Not necessarily. Other components can remain unchanged or change differently.']]
  },
  {
    slug: 'how-to-choose-a-silver-ring', title: 'How to Choose a Silver Ring', category: 'Jewellery Guides',
    description: 'Choose a 925 silver ring based on fit, comfort, design, everyday use and the recipient’s style.',
    answer: 'Start with the correct size, then consider design, width, comfort, finish, stone details and how often the ring will be worn.', takeaway: 'Fit first, style second, long-term wearability third.',
    sections: [['Get the size right', 'Use the seller’s sizing guidance and measure carefully.'], ['Think about everyday use', 'Consider profile, setting and design if the ring will be worn frequently.'], ['Match personality', 'Minimal bands suit understated styling, while stones, motifs and statement shapes can work for expressive gifting.']], faq: [['Is silver good for rings?', '925 sterling silver is widely used for rings and can be practical when properly made and cared for.'], ['What should I check before gifting a ring?', 'Size is the most important practical factor, followed by style and occasion.']]
  },
  {
    slug: 'how-to-choose-silver-earrings', title: 'How to Choose Silver Earrings', category: 'Jewellery Guides',
    description: 'Choose 925 silver earrings by style, size, comfort, fastening and occasion.',
    answer: 'Choose earrings based on the wearer’s style, preferred size and weight, fastening type, comfort and occasion.', takeaway: 'The best earrings are the ones the recipient will actually enjoy wearing.',
    sections: [['Choose the silhouette', 'Studs, hoops, drops and statement earrings create different looks. Start with the recipient’s existing style.'], ['Consider comfort', 'Size, weight and fastening matter for everyday wear.'], ['Choose for the occasion', 'Simple studs and hoops can be versatile; detailed designs can make stronger special-occasion gifts.']], faq: [['Are silver studs good for gifting?', 'Yes. Studs can be a practical gifting choice because they often suit everyday styling.']]
  },
  {
    slug: 'silver-gifts-for-girlfriend', title: 'Silver Gifts for Girlfriend: A Practical Guide', category: 'Gifting',
    description: 'Meaningful 925 silver jewellery gift ideas for a girlfriend, chosen around personality and occasion.',
    answer: 'A good silver gift for a girlfriend usually matches her personal style and connects naturally to the occasion or memory behind the gift.', takeaway: 'The meaning behind the piece matters more than choosing the most expensive design.',
    sections: [['For a subtle romantic gift', 'Consider a small pendant, delicate ring or simple earrings if she prefers understated jewellery.'], ['For a memorable occasion', 'A distinctive design can work well for anniversaries, birthdays or relationship milestones.'], ['Make it personal', 'Connect the jewellery to a shared memory, date or inside joke.']], faq: [['Is silver jewellery a good romantic gift?', 'Yes. A wearable jewellery piece can become a lasting reminder of a relationship or special moment.'], ['What should I gift my girlfriend?', 'Start with her existing jewellery style and choose a ring, pendant, earrings or bracelet that feels natural for her.']]
  },
  {
    slug: 'silver-gifts-for-mother', title: 'Silver Gifts for Mother: Thoughtful Jewellery Ideas', category: 'Gifting',
    description: 'How to choose meaningful silver jewellery for your mother for birthdays, milestones and special occasions.',
    answer: 'Choose silver jewellery that reflects your mother’s everyday style and feels connected to the occasion rather than simply choosing the most elaborate design.', takeaway: 'Comfort, simplicity and emotional meaning are strong starting points.',
    sections: [['Everyday pieces', 'A comfortable pendant, simple earrings or understated bracelet can work well for regular wear.'], ['Milestone gifting', 'For birthdays and family milestones, a symbolic motif can add meaning.'], ['Choose her style', 'Notice whether she prefers minimal, traditional, modern or statement jewellery.']], faq: [['What is a good silver gift for mother?', 'A pendant, earrings or bracelet that matches her style can be thoughtful.']]
  },
  {
    slug: 'silver-birthday-gifts', title: 'Silver Birthday Gifts: Jewellery Ideas That Feel Personal', category: 'Gifting',
    description: 'A guide to choosing 925 silver birthday gifts for partners, friends, sisters, mothers and family.',
    answer: 'Silver jewellery can make a meaningful birthday gift because it combines personal style with something the recipient can keep and wear.', takeaway: 'Match the design to the recipient, then make the moment personal.',
    sections: [['For a partner', 'Look for designs with a romantic or symbolic connection to your relationship.'], ['For a sister or friend', 'Choose something aligned with her everyday style: minimal, playful, classic or expressive.'], ['For parents', 'Comfortable everyday designs are often a strong starting point.']], faq: [['Is silver jewellery a good birthday gift?', 'Yes. It is wearable, personal and can be chosen around the recipient’s style.'], ['What is a safe silver birthday gift?', 'If you do not know ring size, earrings or pendants can be easier choices.']]
  }
];

const categories = ['Silver Basics','Silver Care','Buying Silver','Jewellery Guides','Gifting'];

export const getAllArticles = () => articles;
export const getArticle = (slug) => articles.find(a => a.slug === slug) || null;
export const getCategories = () => categories;
