import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Settings, Eye, Play, Users } from 'lucide-react';
import { RuleBuilder } from '../../components/admin/RuleBuilder';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';


interface DispensationRule {
  id: string;
  name: string;
  conditions: string;
  action: string;
  mode: 'automatic' | 'manual';
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

export function DispensationSettings() {
  const [activeTab, setActiveTab] = useState<'rules' | 'builder' | 'applications'>('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRule, setEditingRule] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Perpanjang Jatuh Tempo IPK Rendah',
      rule: {
        name: 'Perpanjang Jatuh Tempo IPK Rendah',
        conditionGroups: [{
          id: 'group-1',
          logic: 'AND',
          conditions: [
            { id: 'c1', fact: 'student.gpa', operator: '<', value: '2.5' },
            { id: 'c2', fact: 'student.status', operator: '=', value: 'Aktif' }
          ]
        }],
        action: {
          type: 'extend_due_date',
          parameters: { extensionDuration: 30, extensionUnit: 'days' }
        }
      },
      type: 'dispensation' as const
    }
  ]);

  // Mock data
  const dispensationRules: DispensationRule[] = [
    {
      id: '1',
      name: 'Perpanjang Jatuh Tempo IPK Rendah',
      conditions: 'Mahasiswa.IPK < 2.5 DAN Mahasiswa.Status = Aktif',
      action: 'Perpanjang Jatuh Tempo + 30 Hari',
      mode: 'automatic',
      status: 'active',
      createdAt: '2024-01-15',
      appliedCount: 45
    },
    {
      id: '2',
      name: 'Potongan Mahasiswa Berprestasi',
      conditions: 'Mahasiswa.IPK >= 3.5 DAN Mahasiswa.Semester >= 5',
      action: 'Berikan Potongan 20%',
      mode: 'manual',
      status: 'active',
      createdAt: '2024-01-10',
      appliedCount: 23
    },
    {
      id: '3',
      name: 'Cicilan untuk Angkatan Lama',
      conditions: 'Mahasiswa.Angkatan <= 2020 DAN Tagihan.Nominal > 3000000',
      action: 'Ubah menjadi 3 Cicilan Bulanan',
      mode: 'manual',
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
    console.log('Saving dispensation rule:', rule);
    // Implementation would save rule to backend
    setActiveTab('rules');
    setEditingRule(null);
  };

  const handleSaveAsTemplate = (rule: any, templateName: string) => {
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: templateName,
      rule: rule,
      type: 'dispensation'
    };
    setTemplates(prev => [...prev, newTemplate]);
    console.log('Saved as template:', newTemplate);
  };

  const openRuleBuilder = (rule?: any) => {
    setEditingRule(rule || null);
    setActiveTab('builder');
  };

  const filteredRules = dispensationRules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.conditions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Dispensasi Pembayaran</h1>
          <p className="text-gray-600 mt-1">Kelola aturan keringanan dan dispensasi pembayaran</p>
        </div>
        
        {activeTab === 'rules' && (
          <Button 
            onClick={() => openRuleBuilder()}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Buat Aturan Dispensasi Baru
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Aturan</p>
              <p className="text-2xl font-bold text-gray-900">{dispensationRules.length}</p>
            </div>
            <Settings className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aturan Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {dispensationRules.filter(r => r.status === 'active').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Dispensasi Diberikan</p>
              <p className="text-2xl font-bold text-blue-600">
                {dispensationRules.reduce((sum, rule) => sum + rule.appliedCount, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aturan Otomatis</p>
              <p className="text-2xl font-bold text-purple-600">
                {dispensationRules.filter(r => r.mode === 'automatic').length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
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
            Aturan Dispensasi
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
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Aplikasi Manual
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
                    placeholder="Cari aturan dispensasi..."
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
                  <option value="">Semua Mode</option>
                  <option value="automatic">Otomatis</option>
                  <option value="manual">Manual</option>
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
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Mode</th>
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
                          rule.mode === 'automatic' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {rule.mode === 'automatic' ? 'Otomatis' : 'Manual'}
                        </span>
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
                          {rule.appliedCount.toLocaleString()} kali
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
              {editingRule ? 'Edit Aturan Dispensasi' : 'Buat Aturan Dispensasi Baru'}
            </div>
          </div>

          <RuleBuilder
            type="dispensation"
            initialRule={editingRule}
            onSave={handleSaveRule}
            onSaveAsTemplate={handleSaveAsTemplate}
            templates={templates}
          />
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Aplikasi Dispensasi Manual</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Template Dispensasi
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Pilih template...</option>
                    {templates.filter(t => t.type === 'dispensation').map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter Mahasiswa
                  </label>
                  <div className="space-y-2">
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Semua Program Studi</option>
                      <option value="agroteknologi">Agroteknologi</option>
                      <option value="teknologi-pangan">Teknologi Pangan</option>
                    </select>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Semua Angkatan</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Atau Input NIM Manual
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Masukkan NIM (pisahkan dengan koma atau baris baru)&#10;Contoh:&#10;20240001, 20240002&#10;20240003"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Penerima Dispensasi
                  </label>
                  <div className="border rounded-lg p-4 bg-gray-50 h-64 overflow-y-auto">
                    <p className="text-sm text-gray-600">
                      Pilih template dan filter untuk melihat daftar mahasiswa yang akan menerima dispensasi.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    Preview Penerima Dispensasi
                  </Button>
                  <Button variant="outline" className="w-full">
                    Terapkan Dispensasi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}