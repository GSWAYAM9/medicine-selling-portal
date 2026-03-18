'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Plus, Send } from 'lucide-react';
import Link from 'next/link';

export default function PrescriptionsPage() {
  const { user, isAuthenticated } = useAuth();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientEmail: '',
    medicines: '',
    notes: '',
  });

  if (!isAuthenticated || user?.role !== 'doctor') {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background py-12 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">Only doctors can access the prescription system.</p>
            <Link href="/medicines">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrescription = {
      id: `rx${Date.now()}`,
      doctorId: user.id,
      doctorName: user.name,
      patientEmail: formData.patientEmail,
      medicines: formData.medicines.split(',').map(m => m.trim()),
      notes: formData.notes,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };
    setPrescriptions([newPrescription, ...prescriptions]);
    setFormData({ patientEmail: '', medicines: '', notes: '' });
    setShowForm(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Prescription Management</h1>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Issue Prescription
              </Button>
            )}
          </div>

          {/* Issue Prescription Form */}
          {showForm && (
            <Card className="p-6 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Issue New Prescription</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Email</Label>
                  <Input
                    id="patient"
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicines">Medicines (comma-separated)</Label>
                  <Input
                    id="medicines"
                    placeholder="Amoxicillin 250mg, Metformin 500mg"
                    value={formData.medicines}
                    onChange={(e) => setFormData({ ...formData, medicines: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    placeholder="Dosage instructions and special notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="gap-2">
                    <Send className="h-4 w-4" /> Issue Prescription
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Prescriptions List */}
          <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No prescriptions issued yet.</p>
              </Card>
            ) : (
              prescriptions.map(prescription => (
                <Card key={prescription.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">Prescription #{prescription.id}</h3>
                      <p className="text-sm text-muted-foreground">For: {prescription.patientEmail}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded">
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Medicines</p>
                      <div className="flex flex-wrap gap-2">
                        {prescription.medicines.map((medicine: string, i: number) => (
                          <span key={i} className="bg-muted text-foreground text-sm px-2 py-1 rounded">
                            {medicine}
                          </span>
                        ))}
                      </div>
                    </div>

                    {prescription.notes && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm text-foreground">{prescription.notes}</p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Issued: {new Date(prescription.createdAt).toLocaleDateString()} | 
                      Expires: {new Date(prescription.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
