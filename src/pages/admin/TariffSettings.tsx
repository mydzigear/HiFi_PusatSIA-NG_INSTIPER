import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Settings, Eye, Play } from 'lucide-react';
import { RuleBuilder } from '../../components/admin/RuleBuilder';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';


interface TariffRule {
  id: string;
  name: string;
  conditions: string;
  action: string;
  amount: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  appliedCount: number;
}

interface Template {
  id: string;
  name: string;
  rule: any;
  type: 'tariff' | 'dispensation';
}

export function TariffSettings() {
  const [activeTab, setActiveTab] = useState<'rules' | 'builder'>('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRule, setEditingRule] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'UKT Reguler Angkatan 2025',
      rule: {
        name: 'UKT Reguler Angkatan 2025',
        conditionGroups: [{
          id: 'group-1',
          logic: 'AND',
          conditions: [
            { id: 'c1', fact: 'student.batch', operator: '=', value: '2025' },
            { id: 'c2', fact: 'student.entryPath', operator: '=', value: 'Reguler' }
          ]
        }],
        action: {
          type: 'create_ukt_bill',
          parameters: { amount: 5000000, dueDate: '2024-08-31' }
        }
      },
      type: 'tariff' as const
    }
  ]);

  // Mock data
  const tariffRules: TariffRule[] = [
    {
      id: '1',
      name: 'UKT Reguler Angkatan 2025',
      conditions: 'Mahasiswa.Angkatan = 2025 DAN Mahasiswa.Jalur = Reguler',
      action: 'Buat Tagihan UKT - Rp 5.000.000',
      amount: 5000000,
      status: 'active',
      createdAt: '2024-01-15',
      appliedCount: 1250
    },
    {
      id: '2',
      name: 'UKT Mandiri Teknologi Pangan',
      conditions: 'Mahasiswa.Program = Teknologi Pangan DAN Mahasiswa.Jalur = Mandiri',
      action: 'Buat Tagihan UKT - Rp 7.500.000',
      amount: 7500000,
      status: 'active',
      createdAt: '2024-01-10',
      appliedCount: 85
    },
    {
      id: '3',
      name: 'Herregistrasi Semua Program',
      conditions: 'Mahasiswa.Status = Aktif',
      action: 'Buat Tagihan Herregistrasi - Rp 500.000',
      amount: 500000,
      status: 'draft',
      createdAt: '2024-01-20',
      appliedCount: 0
    }
  ];


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSaveRule = (rule: any) => {
    console.log('Saving tariff rule:', rule);
    // Implementation would save rule to backend
    setActiveTab('rules');
    setEditingRule(null);
  };

  const handleSaveAsTemplate = (rule: any, templateName: string) => {
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: templateName,
      rule: rule,
      type: 'tariff'
    };
    setTemplates(prev => [...prev, newTemplate]);
    console.log('Saved as template:', newTemplate);
  };

  const openRuleBuilder = (rule?: any) => {
    setEditingRule(rule || null);
    setActiveTab('builder');
  };

  const filteredRules = tariffRules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.conditions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Setting Tarif Pembayaran</h1>
          <p className="text-gray-600 mt-1">Kelola aturan tarif pembayaran dengan Rule Builder</p>
        </div>
        
        {activeTab === 'rules' && (
          <Button 
            onClick={() => openRuleBuilder()}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Buat Aturan Tarif Baru
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Aturan</p>
              <p className="text-2xl font-bold text-gray-900">{tariffRules.length}</p>
            </div>
            <Settings className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aturan Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {tariffRules.filter(r => r.status === 'active').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Mahasiswa Terdampak</p>
              <p className="text-2xl font-bold text-blue-600">
                {tariffRules.reduce((sum, rule) => sum + rule.appliedCount, 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Template Tersedia</p>
              <p className="text-2xl font-bold text-purple-600">{templates.length}</p>
            </div>
            <Plus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rules'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Daftar Aturan Tarif
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'builder'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Rule Builder
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Cari aturan tarif..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select className="p-2 border border-gray-300 rounded-md min-w-40">
                  <option value="">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                  <option value="draft">Draft</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-md min-w-40">
                  <option value="">Semua Jenis</option>
                  <option value="ukt">UKT</option>
                  <option value="herregistrasi">Herregistrasi</option>
                  <option value="pendaftaran">Pendaftaran</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rules Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Aturan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Kondisi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tindakan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Diterapkan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRules.map((rule) => (
                    <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{rule.name}</p>
                          <p className="text-sm text-gray-500">Dibuat {formatDate(rule.createdAt)}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate" title={rule.conditions}>
                          {rule.conditions}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate" title={rule.action}>
                          {rule.action}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rule.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : rule.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rule.status === 'active' ? 'Aktif' : rule.status === 'draft' ? 'Draft' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {rule.appliedCount.toLocaleString()} mahasiswa
                        </span>
                      </td>
                      <td className="py-3 px-4">
                         <div className="flex items-center gap-2">
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => openRuleBuilder(rule)}
                           >
                             <Edit className="w-4 h-4" />
                           </Button>
                           <Button
                             variant="outline"
                             size="sm"
                           >
                             <Eye className="w-4 h-4" />
                           </Button>
                           <Button
                             variant="outline"
                             size="sm"
                           >
                             <Trash2 className="w-4 h-4" />
                           </Button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('rules')}
            >
              ← Kembali ke Daftar
            </Button>
            <div className="text-sm text-gray-600">
              {editingRule ? 'Edit Aturan Tarif' : 'Buat Aturan Tarif Baru'}
            </div>
          </div>

          <RuleBuilder
            type="tariff"
            initialRule={editingRule}
            onSave={handleSaveRule}
            onSaveAsTemplate={handleSaveAsTemplate}
            templates={templates}
          />
        </div>
      )}
    </div>
  );
}