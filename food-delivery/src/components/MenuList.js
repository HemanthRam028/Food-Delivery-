import PropTypes from 'prop-types';

const MenuList = ({ menuItems }) => {
  if (!Array.isArray(menuItems)) {
    return <p>No menu items available.</p>; // Fallback message
  }

  return (
    <ul>
      {menuItems.length > 0 ? (
        menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <img src={menuItem.image} alt={menuItem.name} />
            <div>{menuItem.name}</div>
            <div>Price: ${menuItem.price}</div>
          </li>
        ))
      ) : (
        <li>No menu items available.</li>
      )}
    </ul>
  );
};

MenuList.propTypes = {
  menuItems: PropTypes.array.isRequired, // Ensure it's an array
};

export default MenuList;
