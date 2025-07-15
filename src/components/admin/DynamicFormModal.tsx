
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'currency';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface DynamicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  fields: FormField[];
  initialData?: any;
  isEdit?: boolean;
}

export function DynamicFormModal({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData = {},
  isEdit = false
}: DynamicFormModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes or when initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // Filter out any null/undefined fields and ensure they have required properties
  const validFields = (fields || []).filter((field): field is FormField => 
    field != null && 
    typeof field === 'object' && 
    typeof field.name === 'string' && 
    typeof field.label === 'string' &&
    typeof field.type === 'string'
  );

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    validFields.forEach((field) => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} wajib diisi`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({});
      setErrors({});
      onClose();
    }
  };

  const formatCurrency = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ''));
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const renderField = (field: FormField) => {
    // Early return with additional safety checks
    if (!field || typeof field !== 'object' || !field.name || !field.type) {
      console.warn('Invalid field passed to renderField:', field);
      return null;
    }
    
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      case 'currency':
        return (
          <input
            type="text"
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
            placeholder={field.placeholder}
            value={value ? formatCurrency(value.toString()) : ''}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleInputChange(field.name, numericValue);
            }}
          />
        );

      case 'select':
        return (
          <select
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          >
            <option value="">Pilih {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            className={`input-field ${errors[field.name] ? 'border-red-500' : ''}`}
            placeholder={field.placeholder}
            rows={3}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );

      default:
        console.warn('Unknown field type:', field.type);
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid md:grid-cols-2 gap-6">
            {validFields.map((field) => {
              // Additional safety check before rendering
              if (!field || !field.name) {
                console.warn('Skipping invalid field in map:', field);
                return null;
              }
              
              return (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isEdit ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({});
                setErrors({});
                onClose();
              }}
              className="btn-outline"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
