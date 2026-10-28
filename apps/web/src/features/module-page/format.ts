const indian = new Intl.NumberFormat("en-IN");

/** 125000 becomes "₹1,25,000". Negative amounts keep their sign in front of the rupee mark. */
export const formatRupees = (amount: number): string =>
  `${amount < 0 ? "-" : ""}₹${indian.format(Math.abs(Math.round(amount)))}`;

/** 6.2 becomes "₹6.2L", for amounts already counted in lakh rupees. */
export const formatLakh = (lakh: number): string => `₹${lakh.toFixed(1)}L`;
