
import { useState } from 'react';
import { Plus, X, Save, FolderOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Condition {
  id: string;
  fact: string;
  operator: string;
  value: string;
}

interface ConditionGroup {
  id: string;
  logic: 'AND' | 'OR';
  conditions: Condition[];
}

interface Action {
  type: string;
  parameters: Record<string, any>;
}

interface Rule {
  id?: string;
  name: string;
  conditionGroups: ConditionGroup[];
  action: Action;
}

interface Template {
  id: string;
  name: string;
  rule: Rule;
  type: 'tariff' | 'dispensation';
}

interface RuleBuilderProps {
  type: 'tariff' | 'dispensation';
  initialRule?: Rule;
  onSave: (rule: Rule) => void;
  onSaveAsTemplate?: (rule: Rule, templateName: string) => void;
  templates?: Template[];
}

const FACT_OPTIONS = [
  { value: 'student.batch', label: 'Mahasiswa.Angkatan' },
  { value: 'student.program', label: 'Mahasiswa.Program Studi' },
  { value: 'student.entryPath', label: 'Mahasiswa.Jalur Masuk' },
  { value: 'student.status', label: 'Mahasiswa.Status' },
  { value: 'student.gpa', label: 'Mahasiswa.IPK' },
  { value: 'student.semester', label: 'Mahasiswa.Semester' },
  { value: 'bill.type', label: 'Tagihan.Jenis' },
  { value: 'bill.amount', label: 'Tagihan.Nominal' },
  { value: 'bill.dueDate', label: 'Tagihan.Jatuh Tempo' },
];

const OPERATOR_OPTIONS = [
  { value: '=', label: 'Sama Dengan (=)' },
  { value: '!=', label: 'Tidak Sama Dengan (≠)' },
  { value: '>', label: 'Lebih Besar Dari (>)' },
  { value: '<', label: 'Lebih Kecil Dari (<)' },
  { value: '>=', label: 'Lebih Besar Sama Dengan (≥)' },
  { value: '<=', label: 'Lebih Kecil Sama Dengan (≤)' },
  { value: 'contains', label: 'Mengandung' },
  { value: 'in', label: 'Termasuk Dalam' },
];

const TARIFF_ACTION_OPTIONS = [
  { value: 'create_ukt_bill', label: 'Buat Tagihan UKT' },
  { value: 'create_sks_bill', label: 'Buat Tagihan SKS' },
  { value: 'create_registration_bill', label: 'Buat Tagihan Pendaftaran' },
  { value: 'apply_fixed_discount', label: 'Berikan Potongan Biaya Tetap' },
  { value: 'apply_percentage_discount', label: 'Berikan Potongan Persentase' },
];

const DISPENSATION_ACTION_OPTIONS = [
  { value: 'extend_due_date', label: 'Perpanjang Jatuh Tempo' },
  { value: 'apply_discount', label: 'Berikan Keringanan (Potongan)' },
  { value: 'convert_to_installment', label: 'Ubah menjadi Cicilan' },
  { value: 'waive_bill', label: 'Hapus Tagihan' },
];

export function RuleBuilder({ type, initialRule, onSave, onSaveAsTemplate, templates = [] }: RuleBuilderProps) {
  const [rule, setRule] = useState<Rule>(initialRule || {
    name: '',
    conditionGroups: [{
      id: 'group-1',
      logic: 'AND',
      conditions: [{
        id: 'condition-1',
        fact: '',
        operator: '',
        value: ''
      }]
    }],
    action: {
      type: '',
      parameters: {}
    }
  });

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showTemplateList, setShowTemplateList] = useState(false);

  const addConditionGroup = () => {
    const newGroup: ConditionGroup = {
      id: `group-${Date.now()}`,
      logic: 'AND',
      conditions: [{
        id: `condition-${Date.now()}`,
        fact: '',
        operator: '',
        value: ''
      }]
    };
    setRule(prev => ({
      ...prev,
      conditionGroups: [...prev.conditionGroups, newGroup]
    }));
  };

  const addConditionToGroup = (groupId: string, logic: 'AND' | 'OR') => {
    const newCondition: Condition = {
      id: `condition-${Date.now()}`,
      fact: '',
      operator: '',
      value: ''
    };
    
    setRule(prev => ({
      ...prev,
      conditionGroups: prev.conditionGroups.map(group => 
        group.id === groupId 
          ? { ...group, conditions: [...group.conditions, newCondition], logic }
          : group
      )
    }));
  };

  const updateCondition = (groupId: string, conditionId: string, field: keyof Condition, value: string) => {
    setRule(prev => ({
      ...prev,
      conditionGroups: prev.conditionGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              conditions: group.conditions.map(condition =>
                condition.id === conditionId
                  ? { ...condition, [field]: value }
                  : condition
              )
            }
          : group
      )
    }));
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    setRule(prev => ({
      ...prev,
      conditionGroups: prev.conditionGroups.map(group =>
        group.id === groupId
          ? { ...group, conditions: group.conditions.filter(c => c.id !== conditionId) }
          : group
      ).filter(group => group.conditions.length > 0)
    }));
  };

  const updateActionType = (actionType: string) => {
    setRule(prev => ({
      ...prev,
      action: {
        type: actionType,
        parameters: {}
      }
    }));
  };

  const updateActionParameter = (key: string, value: any) => {
    setRule(prev => ({
      ...prev,
      action: {
        ...prev.action,
        parameters: {
          ...prev.action.parameters,
          [key]: value
        }
      }
    }));
  };

  const renderActionParameters = () => {
    const { type: actionType } = rule.action;

    if (!actionType) return null;

    switch (actionType) {
      case 'create_ukt_bill':
      case 'create_sks_bill':
      case 'create_registration_bill':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Nominal (Rp)
              </label>
              <Input
                type="number"
                placeholder="5000000"
                value={rule.action.parameters.amount || ''}
                onChange={(e) => updateActionParameter('amount', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Jatuh Tempo
              </label>
              <Input
                type="date"
                value={rule.action.parameters.dueDate || ''}
                onChange={(e) => updateActionParameter('dueDate', e.target.value)}
              />
            </div>
          </div>
        );

      case 'apply_fixed_discount':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jumlah Potongan (Rp)
            </label>
            <Input
              type="number"
              placeholder="500000"
              value={rule.action.parameters.discountAmount || ''}
              onChange={(e) => updateActionParameter('discountAmount', parseInt(e.target.value))}
            />
          </div>
        );

      case 'apply_percentage_discount':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Persentase Potongan (%)
            </label>
            <Input
              type="number"
              placeholder="10"
              min="0"
              max="100"
              value={rule.action.parameters.discountPercentage || ''}
              onChange={(e) => updateActionParameter('discountPercentage', parseInt(e.target.value))}
            />
          </div>
        );

      case 'extend_due_date':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tambah Durasi
              </label>
              <Input
                type="number"
                placeholder="30"
                value={rule.action.parameters.extensionDuration || ''}
                onChange={(e) => updateActionParameter('extensionDuration', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Satuan Waktu
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={rule.action.parameters.extensionUnit || ''}
                onChange={(e) => updateActionParameter('extensionUnit', e.target.value)}
              >
                <option value="">Pilih satuan</option>
                <option value="days">Hari</option>
                <option value="weeks">Minggu</option>
                <option value="months">Bulan</option>
              </select>
            </div>
          </div>
        );

      case 'apply_discount':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Potongan
              </label>
              <Input
                type="number"
                placeholder="500000"
                value={rule.action.parameters.discountAmount || ''}
                onChange={(e) => updateActionParameter('discountAmount', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Potongan
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={rule.action.parameters.discountType || ''}
                onChange={(e) => updateActionParameter('discountType', e.target.value)}
              >
                <option value="">Pilih tipe</option>
                <option value="percentage">Persen (%)</option>
                <option value="fixed">Nominal (Rp)</option>
              </select>
            </div>
          </div>
        );

      case 'convert_to_installment':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Cicilan
              </label>
              <Input
                type="number"
                placeholder="3"
                min="2"
                max="12"
                value={rule.action.parameters.installmentCount || ''}
                onChange={(e) => updateActionParameter('installmentCount', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Periode Pembayaran
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={rule.action.parameters.installmentPeriod || ''}
                onChange={(e) => updateActionParameter('installmentPeriod', e.target.value)}
              >
                <option value="">Pilih periode</option>
                <option value="weekly">Per Minggu</option>
                <option value="monthly">Per Bulan</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const loadTemplate = (template: Template) => {
    setRule(template.rule);
    setShowTemplateList(false);
  };

  const saveAsTemplate = () => {
    if (templateName && onSaveAsTemplate) {
      onSaveAsTemplate(rule, templateName);
      setTemplateName('');
      setShowTemplateModal(false);
    }
  };

  const filteredTemplates = templates.filter(t => t.type === type);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Rule Builder - {type === 'tariff' ? 'Setting Tarif' : 'Pengaturan Dispensasi'}
          </h2>
          <p className="text-gray-600 text-sm">
            Buat aturan kondisional dengan logika "JIKA... MAKA..."
          </p>
        </div>
        
        <div className="flex gap-2">
          {filteredTemplates.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowTemplateList(!showTemplateList)}
              className="flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Gunakan dari Katalog
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Simpan sebagai Template
          </Button>
        </div>
      </div>

      {/* Template List */}
      {showTemplateList && filteredTemplates.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Pilih Template</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTemplates.map(template => (
              <div key={template.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onClick={() => loadTemplate(template)}>
                <p className="font-medium text-gray-900">{template.name}</p>
                <p className="text-sm text-gray-500">
                  {template.rule.conditionGroups.reduce((total, group) => total + group.conditions.length, 0)} kondisi
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rule Name */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Aturan
        </label>
        <Input
          placeholder="Masukkan nama aturan yang deskriptif..."
          value={rule.name}
          onChange={(e) => setRule(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      {/* IF Conditions */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">🧐</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">JIKA (Kondisi)</h3>
        </div>

        {rule.conditionGroups.map((group, groupIndex) => (
          <div key={group.id} className="mb-6">
            {groupIndex > 0 && (
              <div className="text-center py-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                  ATAU
                </span>
              </div>
            )}
            
            <div className="border rounded-lg p-4 bg-gray-50">
              {group.conditions.map((condition, conditionIndex) => (
                <div key={condition.id} className="mb-3">
                  {conditionIndex > 0 && (
                    <div className="text-center py-1">
                      <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-600">
                        {group.logic}
                      </span>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-12 gap-2 items-center">
                    <div className="md:col-span-4">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={condition.fact}
                        onChange={(e) => updateCondition(group.id, condition.id, 'fact', e.target.value)}
                      >
                        <option value="">Pilih fakta...</option>
                        {FACT_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-3">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        value={condition.operator}
                        onChange={(e) => updateCondition(group.id, condition.id, 'operator', e.target.value)}
                      >
                        <option value="">Operator...</option>
                        {OPERATOR_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-4">
                      <Input
                        placeholder="Nilai..."
                        value={condition.value}
                        onChange={(e) => updateCondition(group.id, condition.id, 'value', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    
                    <div className="md:col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCondition(group.id, condition.id)}
                        className="w-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addConditionToGroup(group.id, 'AND')}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  + DAN
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addConditionToGroup(group.id, 'OR')}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  + ATAU
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addConditionGroup}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tambah Grup Kondisi
        </Button>
      </div>

      {/* THEN Actions */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">
              {type === 'tariff' ? '🎯' : '🙏'}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">MAKA (Tindakan)</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Tindakan {type === 'dispensation' ? 'Dispensasi' : ''}
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={rule.action.type}
              onChange={(e) => updateActionType(e.target.value)}
            >
              <option value="">Pilih jenis tindakan...</option>
              {(type === 'tariff' ? TARIFF_ACTION_OPTIONS : DISPENSATION_ACTION_OPTIONS).map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {renderActionParameters()}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={() => onSave(rule)} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Simpan Aturan
        </Button>
      </div>

      {/* Template Save Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Simpan sebagai Template
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Template
                </label>
                <Input
                  placeholder="Masukkan nama template..."
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowTemplateModal(false)}>
                  Batal
                </Button>
                <Button onClick={saveAsTemplate} disabled={!templateName}>
                  Simpan Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
