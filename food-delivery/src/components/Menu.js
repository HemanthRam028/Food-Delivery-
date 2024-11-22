import React from 'react';
// import './Menu.css';
import { useParams } from 'react-router-dom';



  const menuItems = {
    // Hyderabad Restaurants (1-10)
    1: [
      { name: 'Chicken Biryani', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP.g-vExNB7TGu1Jwx1mj6_2wHaEK&pid=Api&P=0&h=180' },
      { name: 'Mutton Biryani', price: '₹450', image: 'https://tse2.mm.bing.net/th?id=OIP.pK3hTwN_FIWMmNhocPG9tgHaHa&pid=Api&P=0&h=180' },
      { name: 'Paneer Biryani', price: '₹250', image: 'https://tse3.mm.bing.net/th?id=OIP.ysLrucVBR7C8nmDHLG1dlAHaJq&pid=Api&P=0&h=180' }
    ],
    2: [
      { name: 'Hyderabadi Biryani', price: '₹400', image: 'https://tse2.mm.bing.net/th?id=OIP.yuMWrfqxileQ-K2KMQ-zVQHaFa&pid=Api&P=0&h=180' },
      { name: 'Tandoori Chicken', price: '₹350', image: 'https://tse4.mm.bing.net/th?id=OIP.Gc40yuDAANy0d_DYo3FT1wHaHa&pid=Api&P=0&h=180' },
      { name: 'Paneer Tikka', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP.-ndMbbnDa5vPzgLYrBbLMgHaE7&pid=Api&P=0&h=180' }
    ],
    3: [
      { name: 'Mutton Korma', price: '₹500', image: 'https://i.ytimg.com/vi/7I3_5grC72o/maxresdefault.jpg' },
      { name: 'Chicken 65', price: '₹280', image: 'https://tse2.mm.bing.net/th?id=OIP.bBifw2tt7qQ8nqPRSGXX0QHaE8&pid=Api&P=0&h=180' },
      { name: 'Fish Curry', price: '₹400', image: 'https://tse3.mm.bing.net/th?id=OIP.BUt9E2AygirjScbzKq7ThAHaFj&pid=Api&P=0&h=180' }
    ],
    4: [
      { name: 'Special Biryani', price: '₹450', image: 'https://tse2.mm.bing.net/th?id=OIP.9u4ywtxYSoEE6UBDULpf3gHaEH&pid=Api&P=0&h=180' },
      { name: 'Chicken Fry', price: '₹320', image: 'https://tse3.mm.bing.net/th?id=OIP.Fpj_4VLb9UmSKY-iCtkk6QHaFj&pid=Api&P=0&h=180' },
      { name: 'Dal Makhani', price: '₹200', image: 'https://tse4.mm.bing.net/th?id=OIP.Dk4twNtCIehwb35MtX-ARwHaE-&pid=Api&P=0&h=180' }
    ],
    5: [
      { name: 'Butter Chicken', price: '₹350', image: 'https://tse2.mm.bing.net/th?id=OIP.KKyrmbNcoQc879W5SX_-SQHaLG&pid=Api&P=0&h=180' },
      { name: 'Naan', price: '₹50', image: 'https://tse2.mm.bing.net/th?id=OIP.2L4cBgOM5d3B9YZa3_S4jwHaE8&pid=Api&P=0&h=180' },
      { name: 'Paneer Butter Masala', price: '₹300', image: 'https://tse4.mm.bing.net/th?id=OIP.9X4XOqU38pHZD4jiYwgdmwHaHa&pid=Api&P=0&h=180' }
    ],
    6: [
      { name: 'Veg Thali', price: '₹280', image: 'https://tse3.mm.bing.net/th?id=OIP.79d_H2KHmmii52mIxIEXAAHaGy&pid=Api&P=0&h=180' },
      { name: 'Masala Dosa', price: '₹100', image: 'https://tse3.mm.bing.net/th?id=OIP.ceIHyWwkiz5frRtQxfZy8AHaJQ&pid=Api&P=0&h=180' },
      { name: 'Vada', price: '₹70', image: 'https://tse4.mm.bing.net/th?id=OIP.U-byr6AmPCFWq9q6Ay10VwHaE7&pid=Api&P=0&h=180' }
    ],
    7: [
      { name: 'Crab Curry', price: '₹550', image: 'https://tse2.mm.bing.net/th?id=OIP.5viqruGbuEQSeFqzJxu5qAHaDO&pid=Api&P=0&h=180' },
      { name: 'Fish Fry', price: '₹400', image: 'https://tse4.mm.bing.net/th?id=OIP.Kn4wigV0swo8pDzYeMDAvwHaFH&pid=Api&P=0&h=180' },
      { name: 'Prawn Masala', price: '₹450', image: 'https://tse3.mm.bing.net/th?id=OIP.pDr1w9S2ZrOEKCOBUybN1wHaEK&pid=Api&P=0&h=180' }
    ],
    8: [
      { name: 'Gongura chicken Curry', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP._YtzNXYgue0cgalDVFDY4QAAAA&pid=Api&P=0&h=180' },
      { name: 'Gongura Mutton', price: '₹500', image: 'https://tse1.mm.bing.net/th?id=OIP.-gG3CeBVVpdxVU4gpu01jgHaEK&pid=Api&P=0&h=180' },
      { name: 'Egg Masala', price: '₹180', image: 'https://tse3.mm.bing.net/th?id=OIP.Dx7XyY1fNoNoPGN3ZQhpBAHaE8&pid=Api&P=0&h=180' }
    ],
    9: [
      { name: 'Kebab Platter', price: '₹600', image: 'https://tse4.mm.bing.net/th?id=OIP.rHa01-D1Ko9m4mMJQzPKdwHaHa&pid=Api&P=0&h=180' },
      { name: 'Seekh Kebab', price: '₹320', image: 'https://tse2.mm.bing.net/th?id=OIP.9AWA90TZzA8uDf2cCcn-BQHaE7&pid=Api&P=0&h=180' },
      { name: 'Haleem', price: '₹400', image: 'https://tse3.mm.bing.net/th?id=OIP.5EbqcWAqIWHsI5lgFwrG7AHaE7&pid=Api&P=0&h=180' }
    ],
    10: [
      { name: 'Veg Biryani', price: '₹280', image: 'https://tse3.mm.bing.net/th?id=OIP.09w0S6udb6sRvC1qeh3gdQHaE0&pid=Api&P=0&h=180' },
      { name: 'Puri Bhaji', price: '₹150', image: 'https://tse2.mm.bing.net/th?id=OIP.fHGk5sxurcYsPdqqZc7ARgHaEK&pid=Api&P=0&h=180' },
      { name: 'Gulab Jamun', price: '₹50', image: 'https://tse2.mm.bing.net/th?id=OIP.gwVezsbLeVu_m1dI2T1xhwHaFj&pid=Api&P=0&h=180' }
    ],

    // Vizag Restaurants (11-20)
    11: [
      { name: 'Chicken Biryani', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP.g-vExNB7TGu1Jwx1mj6_2wHaEK&pid=Api&P=0&h=180' },
      { name: 'Mutton Biryani', price: '₹450', image: 'https://tse2.mm.bing.net/th?id=OIP.pK3hTwN_FIWMmNhocPG9tgHaHa&pid=Api&P=0&h=180' },
      { name: 'Paneer Biryani', price: '₹250', image: 'https://tse3.mm.bing.net/th?id=OIP.ysLrucVBR7C8nmDHLG1dlAHaJq&pid=Api&P=0&h=180' }
    ],
    12: [
      { name: 'Hyderabadi Biryani', price: '₹400', image: 'https://tse2.mm.bing.net/th?id=OIP.yuMWrfqxileQ-K2KMQ-zVQHaFa&pid=Api&P=0&h=180' },
      { name: 'Tandoori Chicken', price: '₹350', image: 'https://tse4.mm.bing.net/th?id=OIP.Gc40yuDAANy0d_DYo3FT1wHaHa&pid=Api&P=0&h=180' },
      { name: 'Paneer Tikka', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP.-ndMbbnDa5vPzgLYrBbLMgHaE7&pid=Api&P=0&h=180' }
    ],
    13: [
      { name: 'Mutton Korma', price: '₹500', image: 'https://i.ytimg.com/vi/7I3_5grC72o/maxresdefault.jpg' },
      { name: 'Chicken 65', price: '₹280', image: 'https://tse2.mm.bing.net/th?id=OIP.bBifw2tt7qQ8nqPRSGXX0QHaE8&pid=Api&P=0&h=180' },
      { name: 'Fish Curry', price: '₹400', image: 'https://tse3.mm.bing.net/th?id=OIP.BUt9E2AygirjScbzKq7ThAHaFj&pid=Api&P=0&h=180' }
    ],
    14: [
      { name: 'Special Biryani', price: '₹450', image: 'https://tse2.mm.bing.net/th?id=OIP.9u4ywtxYSoEE6UBDULpf3gHaEH&pid=Api&P=0&h=180' },
      { name: 'Chicken Fry', price: '₹320', image: 'https://tse3.mm.bing.net/th?id=OIP.Fpj_4VLb9UmSKY-iCtkk6QHaFj&pid=Api&P=0&h=180' },
      { name: 'Dal Makhani', price: '₹200', image: 'https://tse4.mm.bing.net/th?id=OIP.Dk4twNtCIehwb35MtX-ARwHaE-&pid=Api&P=0&h=180' }
    ],
    15: [
      { name: 'Butter Chicken', price: '₹350', image: 'https://tse2.mm.bing.net/th?id=OIP.KKyrmbNcoQc879W5SX_-SQHaLG&pid=Api&P=0&h=180' },
      { name: 'Naan', price: '₹50', image: 'https://tse2.mm.bing.net/th?id=OIP.2L4cBgOM5d3B9YZa3_S4jwHaE8&pid=Api&P=0&h=180' },
      { name: 'Paneer Butter Masala', price: '₹300', image: 'https://tse4.mm.bing.net/th?id=OIP.9X4XOqU38pHZD4jiYwgdmwHaHa&pid=Api&P=0&h=180' }
    ],
    16: [
      { name: 'Veg Thali', price: '₹280', image: 'https://tse3.mm.bing.net/th?id=OIP.79d_H2KHmmii52mIxIEXAAHaGy&pid=Api&P=0&h=180' },
      { name: 'Masala Dosa', price: '₹100', image: 'https://tse3.mm.bing.net/th?id=OIP.ceIHyWwkiz5frRtQxfZy8AHaJQ&pid=Api&P=0&h=180' },
      { name: 'Vada', price: '₹70', image: 'https://tse4.mm.bing.net/th?id=OIP.U-byr6AmPCFWq9q6Ay10VwHaE7&pid=Api&P=0&h=180' }
    ],
    17: [
      { name: 'Crab Curry', price: '₹550', image: 'https://tse2.mm.bing.net/th?id=OIP.5viqruGbuEQSeFqzJxu5qAHaDO&pid=Api&P=0&h=180' },
      { name: 'Fish Fry', price: '₹400', image: 'https://tse4.mm.bing.net/th?id=OIP.Kn4wigV0swo8pDzYeMDAvwHaFH&pid=Api&P=0&h=180' },
      { name: 'Prawn Masala', price: '₹450', image: 'https://tse3.mm.bing.net/th?id=OIP.pDr1w9S2ZrOEKCOBUybN1wHaEK&pid=Api&P=0&h=180' }
    ],
    18: [
      { name: 'Gongura chicken Curry', price: '₹300', image: 'https://tse2.mm.bing.net/th?id=OIP._YtzNXYgue0cgalDVFDY4QAAAA&pid=Api&P=0&h=180' },
      { name: 'Gongura Mutton', price: '₹500', image: 'https://tse1.mm.bing.net/th?id=OIP.-gG3CeBVVpdxVU4gpu01jgHaEK&pid=Api&P=0&h=180' },
      { name: 'Egg Masala', price: '₹180', image: 'https://tse3.mm.bing.net/th?id=OIP.Dx7XyY1fNoNoPGN3ZQhpBAHaE8&pid=Api&P=0&h=180' }
    ],
    19: [
      { name: 'Kebab Platter', price: '₹600', image: 'https://tse4.mm.bing.net/th?id=OIP.rHa01-D1Ko9m4mMJQzPKdwHaHa&pid=Api&P=0&h=180' },
      { name: 'Seekh Kebab', price: '₹320', image: 'https://tse2.mm.bing.net/th?id=OIP.9AWA90TZzA8uDf2cCcn-BQHaE7&pid=Api&P=0&h=180' },
      { name: 'Haleem', price: '₹400', image: 'https://tse3.mm.bing.net/th?id=OIP.5EbqcWAqIWHsI5lgFwrG7AHaE7&pid=Api&P=0&h=180' }
    ],
    20: [
      { name: 'Veg Biryani', price: '₹280', image: 'https://tse3.mm.bing.net/th?id=OIP.09w0S6udb6sRvC1qeh3gdQHaE0&pid=Api&P=0&h=180' },
      { name: 'Puri Bhaji', price: '₹150', image: 'https://tse2.mm.bing.net/th?id=OIP.fHGk5sxurcYsPdqqZc7ARgHaEK&pid=Api&P=0&h=180' },
      { name: 'Gulab Jamun', price: '₹50', image: 'https://tse2.mm.bing.net/th?id=OIP.gwVezsbLeVu_m1dI2T1xhwHaFj&pid=Api&P=0&h=180' }
    ]
  };

  const Menu = () => {
    const { id } = useParams();
    const items = menuItems[id]; // Get the menu items for the specific restaurant
    
    console.log(items);
  
    if (!items) {
      return <div>No menu items found for this restaurant.</div>;
    }
  
    return (
      <div className="menu">
        <h1>Menu</h1>
        <div className="menu-items">
          {items.map((item, index) => (
            <div key={index} className="menu-item">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Menu;