
import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { getEnquiries, updateEnquiryStatus } from '../../services/enquiryApi';

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Map backend statuses to frontend display
  const statusMapToFrontend = {
    pending: 'new',
    responded: 'in-progress',
    closed: 'resolved',
  };

  const statusMapToBackend = {
    new: 'pending',
    'in-progress': 'responded',
    resolved: 'closed',
  };

  // Fetch enquiries from API
  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getEnquiries();
        if (response.success) {
          // Map backend statuses to frontend
          const mappedEnquiries = response.enquiries.map(enquiry => ({
            ...enquiry,
            status: statusMapToFrontend[enquiry.status] || enquiry.status,
            date: enquiry.createdAt ? new Date(enquiry.createdAt).toISOString() : enquiry.date,
          }));
          setEnquiries(mappedEnquiries);
        } else {
          throw new Error(response.error || 'Failed to fetch enquiries');
        }
      } catch (err) {
        console.error('Error fetching enquiries:', err.message);
        setError('Failed to load enquiries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsViewModalOpen(true);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setError(null);
      const backendStatus = statusMapToBackend[newStatus];
      const response = await updateEnquiryStatus(id, backendStatus);
      if (response.success) {
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enquiry =>
            enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
          )
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      } else {
        throw new Error(response.error || 'Failed to update enquiry status');
      }
    } catch (err) {
      console.error('Error updating enquiry status:', err.message);
      setError('Failed to update enquiry status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesStatus = filterStatus === 'all' || enquiry.status === filterStatus;
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.product.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104016] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading enquiries...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Enquiry Management</h1>
            <p className="text-gray-600">Manage and respond to customer enquiries</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter by status:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016]"
                >
                  <option value="all">All Enquiries</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* <div className="relative">
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#104016] focus:border-[#104016] pl-10"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div> */}
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#104016] rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">{enquiry.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                            <div className="text-sm text-gray-500">{enquiry.email}</div>
                            <div className="text-sm text-gray-500">{enquiry.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{enquiry.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(enquiry.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                          className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            enquiry.status
                          )} focus:outline-none focus:ring-1 focus:ring-[#104016]`}
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewEnquiry(enquiry)}
                          className="text-[#104016] hover:text-[#2c7744] mr-4"
                        >
                          View Details
                        </button>
                        <a
                          href={`mailto:${enquiry.email}?subject=Re: Your enquiry about ${enquiry.product}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Reply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEnquiries.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No enquiries found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ? 'Try adjusting your search term or filter' : 'No enquiries match your current filters'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* View Enquiry Modal */}
      {isViewModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-900">Enquiry Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
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
                      <p className="text-gray-900">{selectedEnquiry.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedEnquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedEnquiry.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="text-gray-900">{selectedEnquiry.company || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900">Enquiry Information</h4>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Product</p>
                      <p className="text-gray-900">{selectedEnquiry.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Submitted</p>
                      <p className="text-gray-900">{formatDate(selectedEnquiry.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <select
                        value={selectedEnquiry.status}
                        onChange={(e) => updateEnquiryStatus(selectedEnquiry.id, e.target.value)}
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                          selectedEnquiry.status
                        )} focus:outline-none focus:ring-1 focus:ring-[#104016]`}
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900">Enquiry Message</h4>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: Your enquiry about ${selectedEnquiry.product}`}
                className="px-4 py-2 bg-[#104016] text-white rounded-md hover:bg-[#2c7744] transition-colors"
              >
                Reply via Email
              </a>
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
    </div>
  );
};

export default Enquiry;
