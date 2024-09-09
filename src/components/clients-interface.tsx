'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Users, TrendingUp, AlertTriangle } from "lucide-react"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'Actif' | 'Inactif' | 'En attente'
  totalClaims: number
  lastClaimDate: string
}

const clients: Client[] = [
  { id: '1', name: 'Alice Dubois', email: 'alice@example.com', phone: '01 23 45 67 89', status: 'Actif', totalClaims: 3, lastClaimDate: '2023-05-15' },
  { id: '2', name: 'Bob Martin', email: 'bob@example.com', phone: '01 98 76 54 32', status: 'Inactif', totalClaims: 1, lastClaimDate: '2022-11-30' },
  { id: '3', name: 'Claire Lefebvre', email: 'claire@example.com', phone: '01 11 22 33 44', status: 'En attente', totalClaims: 0, lastClaimDate: '-' },
  { id: '4', name: 'David Moreau', email: 'david@example.com', phone: '01 55 66 77 88', status: 'Actif', totalClaims: 2, lastClaimDate: '2023-06-01' },
]

export function ClientsInterface() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const openClientDetails = (client: Client) => {
    setSelectedClient(client)
  }

  const renderClientTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                client.status === 'Actif' ? 'bg-green-100 text-green-700' :
                client.status === 'Inactif' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {client.status}
              </span>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => openClientDetails(client)}>
                    Plus de détails
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Détails du client</DialogTitle>
                    <DialogDescription>Informations détaillées sur {client.name}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={client.name} />
                        <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Téléphone</p>
                        <p>{client.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Statut</p>
                        <p>{client.status}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total des réclamations</p>
                        <p>{client.totalClaims}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Dernière réclamation</p>
                        <p>{client.lastClaimDate}</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderClientSummary = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.length}</div>
          <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.filter(c => c.status === 'Actif').length}</div>
          <p className="text-xs text-muted-foreground">+1 depuis le mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients inactifs</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.filter(c => c.status === 'Inactif').length}</div>
          <p className="text-xs text-muted-foreground">-1 depuis le mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des réclamations</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clients.reduce((sum, client) => sum + client.totalClaims, 0)}</div>
          <p className="text-xs text-muted-foreground">+5 depuis le mois dernier</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Gestion des Clients</h2>
      <Tabs defaultValue="liste" className="space-y-4">
        <TabsList>
          <TabsTrigger value="liste">Liste des clients</TabsTrigger>
          <TabsTrigger value="recap">Récapitulatif</TabsTrigger>
        </TabsList>
        <TabsContent value="liste" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des clients</CardTitle>
              <CardDescription>Gérez et consultez les informations de vos clients</CardDescription>
            </CardHeader>
            <CardContent>{renderClientTable()}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif des clients</CardTitle>
              <CardDescription>Vue d'ensemble de votre base client</CardDescription>
            </CardHeader>
            <CardContent>{renderClientSummary()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}