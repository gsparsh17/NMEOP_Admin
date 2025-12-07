import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3
} from "lucide-react";
import DataTable from "../../components/admin/DataTable";

const priceDataSchema = {
  fields: [
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'select', required: true, options: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25', '2025-26'] },
    { name: 'month', label: 'Month', type: 'select', required: true, options: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    { name: 'ffbPrice', label: 'FFB Price (₹/MT)', type: 'number', required: true, min: 5000, max: 30000 },
    { name: 'cpoPrice', label: 'CPO Price (₹/MT)', type: 'number', required: true, min: 50000, max: 150000 },
    { name: 'source', label: 'Source', type: 'select', options: ['AGMARKNET', 'State Dept', 'Market Reports', 'Official Notification'] },
    { name: 'status', label: 'Status', type: 'select', options: ['Verified', 'Pending Review', 'Draft'] }
  ]
};

export default function PriceDataManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    year: "all",
    month: "all",
    status: "all"
  });
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data - replace with API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPriceData([
        { id: 1, state: "Telangana", year: "2024-25", month: "Oct", ffbPrice: 19681, cpoPrice: 115715, source: "Official Notification", status: "Verified", updatedAt: "2024-01-15" },
        { id: 2, state: "Andhra Pradesh", year: "2024-25", month: "Sep", ffbPrice: 17951, cpoPrice: 116159, source: "State Dept", status: "Verified", updatedAt: "2024-01-14" },
        { id: 3, state: "Karnataka", year: "2024-25", month: "Aug", ffbPrice: 15306, cpoPrice: 110191, source: "AGMARKNET", status: "Pending Review", updatedAt: "2024-01-13" },
        { id: 4, state: "Tamil Nadu", year: "2024-25", month: "Jul", ffbPrice: 8126, cpoPrice: null, source: "Market Reports", status: "Draft", updatedAt: "2024-01-12" },
        { id: 5, state: "Kerala", year: "2024-25", month: "Jun", ffbPrice: 9000, cpoPrice: 104823, source: "State Dept", status: "Verified", updatedAt: "2024-01-11" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredData = priceData.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.year.includes(searchTerm) ||
      item.month.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = filters.year === "all" || item.year === filters.year;
    const matchesMonth = filters.month === "all" || item.month === filters.month;
    const matchesStatus = filters.status === "all" || item.status === filters.status;

    return matchesSearch && matchesYear && matchesMonth && matchesStatus;
  });

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setPriceData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = (updatedData) => {
    if (editingRow) {
      setPriceData(prev => prev.map(item => 
        item.id === editingRow.id ? { ...item, ...updatedData } : item
      ));
      setEditingRow(null);
    } else {
      setPriceData(prev => [...prev, { id: Date.now(), ...updatedData, updatedAt: new Date().toISOString().split('T')[0] }]);
    }
  };

  const handleBulkUpload = (data) => {
    // Process bulk upload
    console.log("Bulk upload data:", data);
    setShowBulkUpload(false);
  };

  const handleValidate = (results) => {
    console.log("Validation results:", results);
    setShowValidation(false);
  };

  const summaryStats = {
    totalRecords: priceData.length,
    verified: priceData.filter(item => item.status === "Verified").length,
    pending: priceData.filter(item => item.status === "Pending Review").length,
    draft: priceData.filter(item => item.status === "Draft").length,
    averageFFB: Math.round(priceData.reduce((sum, item) => sum + (item.ffbPrice || 0), 0) / priceData.filter(item => item.ffbPrice).length),
    averageCPO: Math.round(priceData.reduce((sum, item) => sum + (item.cpoPrice || 0), 0) / priceData.filter(item => item.cpoPrice).length)
  };

  return (
    <div className="space-y-6">
      {/* Government Header */}
      <div className="bg-white border-l-4 border-[#003366] shadow-md rounded-r-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-[#003366]">FFB & CPO Price Data Management</h2>
                <div className="bg-[#003366] text-white px-3 py-1 rounded text-sm font-medium">
                  <span>FINANCIAL DATA</span>
                </div>
              </div>
              
              <p className="text-gray-700 mt-1 border-l-3 border-[#0072bc] pl-3">
                Update and manage Fresh Fruit Bunches and Crude Palm Oil price data across states
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowBulkUpload(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Upload size={16} />
                Bulk Upload
              </button>
              <button
                onClick={() => setShowValidation(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <CheckCircle size={16} />
                Validate Data
              </button>
              <button
                onClick={() => setEditingRow({})}
                className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244]"
              >
                <Plus size={16} />
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Total Records</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">{summaryStats.totalRecords}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600">Verified</div>
          <div className="text-2xl font-bold text-green-700 mt-1">{summaryStats.verified}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="text-sm text-amber-600">Pending</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{summaryStats.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600">Avg FFB</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">₹{summaryStats.averageFFB?.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600">Avg CPO</div>
          <div className="text-2xl font-bold text-purple-700 mt-1">₹{summaryStats.averageCPO?.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Last Updated</div>
          <div className="text-lg font-bold text-gray-800 mt-1">Today</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by state, year, or month..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
              />
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={filters.year}
              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
            >
              <option value="all">All Years</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-[#003366] focus:border-[#003366]"
            >
              <option value="all">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
            <Filter size={14} />
            More Filters
          </button>
          <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
            Last 30 Days
          </button>
          <button className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
            Verified Only
          </button>
          <button className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm">
            Needs Review
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={[
          { key: 'state', label: 'State', sortable: true },
          { key: 'year', label: 'Year', sortable: true },
          { key: 'month', label: 'Month', sortable: true },
          { 
            key: 'ffbPrice', 
            label: 'FFB Price (₹)', 
            sortable: true,
            render: (value) => value ? `₹${value.toLocaleString()}` : 'N/A'
          },
          { 
            key: 'cpoPrice', 
            label: 'CPO Price (₹)', 
            sortable: true,
            render: (value) => value ? `₹${value.toLocaleString()}` : 'N/A'
          },
          { 
            key: 'status', 
            label: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                value === 'Verified' ? 'bg-green-100 text-green-800' :
                value === 'Pending Review' ? 'bg-amber-100 text-amber-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {value}
              </span>
            )
          },
          {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          }
        ]}
        loading={loading}
        onRowClick={handleEdit}
      />

      {/* Edit/Add Modal */}
      {editingRow && (
        <PriceDataForm
          data={editingRow}
          schema={priceDataSchema}
          onSave={handleSave}
          onClose={() => setEditingRow(null)}
        />
      )}

      {/* Bulk Upload Modal */}
      {/* {showBulkUpload && (
        <BulkUploadModal
          onClose={() => setShowBulkUpload(false)}
          onUpload={handleBulkUpload}
          template="/templates/price-data-template.csv"
          instructions="Upload CSV file with columns: State, Year, Month, FFB_Price, CPO_Price, Source"
        />
      )} */}

      {/* Validation Modal */}
      {/* {showValidation && (
        <DataValidationModal
          onClose={() => setShowValidation(false)}
          onValidate={handleValidate}
          data={priceData}
          rules={[
            { field: 'ffbPrice', rule: 'required', message: 'FFB Price is required' },
            { field: 'ffbPrice', rule: 'range', min: 5000, max: 30000, message: 'FFB Price must be between ₹5,000 and ₹30,000' },
            { field: 'cpoPrice', rule: 'range', min: 50000, max: 150000, message: 'CPO Price must be between ₹50,000 and ₹150,000' }
          ]}
        />
      )} */}
    </div>
  );
}

// Price Data Form Component
function PriceDataForm({ data, schema, onSave, onClose }) {
  const [formData, setFormData] = useState(data || {});
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    schema.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'number' && formData[field.name]) {
        const value = parseFloat(formData[field.name]);
        if (field.min !== undefined && value < field.min) {
          newErrors[field.name] = `${field.label} must be at least ${field.min}`;
        }
        if (field.max !== undefined && value > field.max) {
          newErrors[field.name] = `${field.label} must be at most ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#003366] to-[#00509e] text-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {data.id ? 'Edit Price Data' : 'Add New Price Data'}
            </h3>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schema.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:border-[#003366]`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className={`w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:border-[#003366]`}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
                
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#003366] text-white rounded-lg hover:bg-[#002244]"
            >
              {data.id ? 'Update' : 'Save'} Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}