import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeSection, setActiveSection] = useState('customers'); // 'customers' or 'generatePassword'
  const [gstNumber, setGstNumber] = useState('');
  const [generatedPasswords, setGeneratedPasswords] = useState([]);

  // Sample contact data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@example.com',
          phone: '+91 9876543210',
          company: 'Tech Solutions India',
          gstNumber: '29ABCDE1234F1Z5',
          message: 'Interested in purchasing 5 Dell workstations for our new office.',
          type: 'new',
          date: '2023-10-15T14:30:00Z',
          status: 'pending'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 8765432109',
          company: 'Delhi University',
          gstNumber: '07ABCDE1234F1Z6',
          message: 'Need quotation for 10 HP printers for computer lab.',
          type: 'existing',
          date: '2023-10-14T11:15:00Z',
          status: 'contacted',
          password: 'temp123' // This would be hashed in a real application
        },
        {
          id: 3,
          name: 'Vikram Singh',
          email: 'vikram.singh@example.com',
          phone: '+91 7654321098',
          company: 'Secure Systems Pvt Ltd',
          gstNumber: '09ABCDE1234F1Z7',
          message: 'Looking for complete CCTV solution for new office building.',
          type: 'new',
          date: '2023-10-10T09:45:00Z',
          status: 'pending'
        },
        {
          id: 4,
          name: 'Anjali Mehta',
          email: 'anjali.mehta@example.com',
          phone: '+91 6543210987',
          company: 'Bright Future School',
          gstNumber: '24ABCDE1234F1Z8',
          message: 'Interested in interactive panels for classrooms.',
          type: 'existing',
          date: '2023-10-08T16:20:00Z',
          status: 'completed',
          password: 'school456' // This would be hashed in a real application
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleSetPassword = (contact) => {
    setSelectedContact(contact);
    setNewPassword('');
    setPasswordError('');
    setIsPasswordModalOpen(true);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const savePassword = () => {
    if (!newPassword) {
      setPasswordError('Please generate or enter a password');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Update the contact with the new password
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, password: newPassword, type: 'existing' } 
          : contact
      )
    );

    setIsPasswordModalOpen(false);
    setSelectedContact(null);
    setNewPassword('');
    setPasswordError('');
  };

  const generatePasswordForGST = () => {
    if (!gstNumber) {
      alert('Please enter a GST number');
      return;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Add to generated passwords list
    setGeneratedPasswords(prev => [
      ...prev,
      { gstNumber, password, date: new Date().toISOString() }
    ]);

    setGstNumber('');
  };

  const updateContactStatus = (id, newStatus) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      )
    );
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'contacted': return 'Contacted';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const getTypeColor = (type) => {
    return type === 'new' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800';
  };

  const getTypeText = (type) => {
    return type === 'new' ? 'New Customer' : 'Existing Customer';
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesType = filterType === 'all' || contact.type === filterType;
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104016] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contacts...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600">Manage customer passwords and inquiries</p>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveSection('generatePassword')}
                className={`px-4 py-2 rounded-md ${
                  activeSection === 'generatePassword'
                    ? 'bg-[#104016] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Generate Password
              </button>
              <button
                onClick={() => setActiveSection('customers')}
                className={`px-4 py-2 rounded-md ${
                  activeSection === 'customers'
                    ? 'bg-[#104016] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Customer Contacts
              </button>
            </div>
          </div>

          {activeSection === 'generatePassword' ? (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Generate Password with GST Number</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="Enter GST number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={generatePasswordForGST}
                    className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors"
                  >
                    Generate Password
                  </button>
                </div>
              </div>

              {generatedPasswords.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Generated Passwords</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            GST Number
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Password
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Generated Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {generatedPasswords.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.gstNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                              {item.password}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(item.date)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Filters and Search */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Filter by type:</label>
                    <select 
                      value={filterType} 
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    >
                      <option value="all">All Contacts</option>
                      <option value="new">New Customers</option>
                      <option value="existing">Existing Customers</option>
                    </select>
                  </div>
                  
                  
                </div>
              </div>

              {/* Contacts Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-[#104016] rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {contact.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                                <div className="text-sm text-gray-500">{contact.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.company}</div>
                            {contact.gstNumber && (
                              <div className="text-sm text-gray-500">GST: {contact.gstNumber}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                              {getTypeText(contact.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contact.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={contact.status}
                              onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                              className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)} focus:outline-none focus:ring-1 focus:ring-[#104016]`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewContact(contact)}
                              className="text-[#104016] hover:text-[#2c7744] mr-4"
                            >
                              View
                            </button>
                            {contact.type === 'new' && (
                              <button
                                onClick={() => handleSetPassword(contact)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Set Password
                              </button>
                            )}
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Email
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredContacts.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No contacts found</h3>
                    <p className="mt-1 text-gray-500">
                      {searchTerm ? 'Try adjusting your search term or filter' : 'No contacts match your current filters'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* View Contact Modal */}
      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Customer Information</h4>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-900">{selectedContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedContact.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedContact.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="text-gray-900">{selectedContact.company}</p>
                    </div>
                    {selectedContact.gstNumber && (
                      <div>
                        <p className="text-sm text-gray-500">GST Number</p>
                        <p className="text-gray-900">{selectedContact.gstNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Contact Information</h4>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(selectedContact.type)}`}>
                        {getTypeText(selectedContact.type)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="text-gray-900">{formatDate(selectedContact.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <select
                        value={selectedContact.status}
                        onChange={(e) => updateContactStatus(selectedContact.id, e.target.value)}
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedContact.status)} focus:outline-none focus:ring-1 focus:ring-[#104016]`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    {selectedContact.type === 'existing' && selectedContact.password && (
                      <div>
                        <p className="text-sm text-gray-500">Customer Password</p>
                        <p className="text-gray-900 font-mono">{selectedContact.password}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900">Message</h4>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <a
                href={`mailto:${selectedContact.email}`}
                className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors"
              >
                Send Email
              </a>
              {selectedContact.type === 'new' && (
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleSetPassword(selectedContact);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Set Password
                </button>
              )}
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Set Password Modal */}
      {isPasswordModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Set Password for {selectedContact.name}</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                    placeholder="Generate or enter a password"
                  />
                  <button
                    onClick={generatePassword}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Generate
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  This password will be sent to the customer for accessing their account.
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                onClick={savePassword}
                className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors"
              >
                Save Password
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;