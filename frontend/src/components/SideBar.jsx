import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    name: 'Link 1',
    path: '/link1',
    children: [
      {
        name: 'Link 1.1',
        path: '/link1-1',
        children: [
          {
            name: 'Link 1.1.1',
            path: '/link1-1-1',
          },
          {
            name: 'Link 1.1.2',
            path: '/link1-1-2',
          },
        ],
      },
      {
        name: 'Link 1.2',
        path: '/link1-2',
      },
    ],
  },
  {
    name: 'Link 2',
    path: '/link2',
  },
];

const Navigation = ({ items }) => (
  <ul style={styles.list}>
    {items.map((item, index) => (
      <li key={index} style={styles.listItem}>
        <Link to={item.path}>{item.name}</Link>
        {item.children && <Navigation items={item.children} />}
      </li>
    ))}
  </ul>
);

const Sidebar = () => (
  <div style={styles.sidebar}>
    <h2>Sidebar</h2>
    <Navigation items={links} />
  </div>
);

const styles = {
  sidebar: {
    width: '200px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '0',
    background: '#333',
    color: '#fff',
    padding: '20px'
  },
  list: {
    listStyleType: 'none',
    padding: '0'
  },
  listItem: {
    marginBottom: '10px'
  }
};

export default Sidebar;
