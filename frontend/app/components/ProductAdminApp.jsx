import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import User from '../models/User';
import Product from '../models/Product';
import AuthPage from './AuthPage';

const initialUsers = [new User('admin', 'admin', 'ADMIN')];
const initialProducts = [
  new Product(1, 'Product A', 'Desc A', 100, 'Category 1'),
  new Product(2, 'Product B', 'Desc B', 200, 'Category 2'),
];

export default function ProductAdminApp() {
  const [users, setUsers] = useState(initialUsers);
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [authView, setAuthView] = useState('login');

  const handleLogin = () => {
    const found = users.find(u => u.username === authForm.username && u.password === authForm.password);
    if (found) {
      setUser(found);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = () => {
    if (users.find(u => u.username === authForm.username)) {
      alert('User already exists');
    } else {
      const newUser = new User(authForm.username, authForm.password);
      setUsers([...users, newUser]);
      setUser(newUser);
    }
  };

  const handleGuest = () => {
    const guest = new User('guest', '', 'GUEST');
    setUser(guest);
  };

  const handleAddOrEdit = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => (p.id === product.id ? product : p)));
    } else {
      const newProduct = new Product(Date.now(), product.name, product.description, product.price, product.category);
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  if (!user) {
    return (
      <AuthPage
        authView={authView}
        authForm={authForm}
        setAuthForm={setAuthForm}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleGuest={handleGuest}
        setAuthView={setAuthView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl h-[90vh] flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
  
        {user.role === 'ADMIN' && (
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={() => setEditingProduct({ name: '', description: '', price: 0, category: '' })}>Add</Button>
            <Button
              onClick={() => {
                if (!selectedProduct) return alert("Select a product to edit.");
                setEditingProduct(selectedProduct);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (!selectedProduct) return alert("Select a product to delete.");
                handleDelete(selectedProduct.id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
  
        <div className="flex-1 overflow-y-auto border rounded p-4 mb-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(product => (
              <Card key={product.id}>
                <CardContent>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p>{product.category}</p>
                  <p>${product.price}</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <Button onClick={() => setSelectedProduct(product)}>Details</Button>
                    {user.role === 'ADMIN' && (
                      <>
                        <Button onClick={() => setEditingProduct(product)}>Edit</Button>
                        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
  
        {selectedProduct && (
          <div className="mb-6 p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-2">Details</h2>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
          </div>
        )}
  
        {user.role === 'ADMIN' && editingProduct && (
          <div className="p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-2">{editingProduct?.id ? 'Edit Product' : 'Add Product'}</h2>
            <div className="grid gap-4">
              <Input placeholder="Name" value={editingProduct.name || ''} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
              <Textarea placeholder="Description" value={editingProduct.description || ''} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
              <Input placeholder="Price" type="number" value={editingProduct.price || ''} onChange={e => setEditingProduct({ ...editingProduct, price: +e.target.value })} />
              <Input placeholder="Category" value={editingProduct.category || ''} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} />
              <Button onClick={() => handleAddOrEdit(editingProduct)}>Save</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
