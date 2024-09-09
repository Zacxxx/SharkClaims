'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart, Shield } from "lucide-react"

const properties = [
  { id: 1, name: "Propriété 1", status: "green", lat: 48.8566, lng: 2.3522 },
  { id: 2, name: "Propriété 2", status: "red", lat: 48.8584, lng: 2.2945 },
  { id: 3, name: "Propriété 3", status: "orange", lat: 48.8738, lng: 2.2950 },
  { id: 4, name: "Propriété 4", status: "yellow", lat: 48.8619, lng: 2.3324 },
]

const parks = [
  { id: "all", name: "Tous les parcs" },
  { id: "park1", name: "Parc A" },
  { id: "park2", name: "Parc B" },
  { id: "park3", name: "Parc C" },
]

export function ParcInterface() {
  const [selectedPark, setSelectedPark] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [activeTab, setActiveTab] = useState("carte")

  const handlePropertyClick = (property) => {
    setSelectedProperty(property)
    setActiveTab("propriete")
  }

  const renderMap = () => (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <Image
        src="/placeholder.svg?height=400&width=800"
        alt="Carte des propriétés"
        layout="fill"
        objectFit="cover"
      />
      {properties.map((property) => (
        <div
          key={property.id}
          className={`absolute w-4 h-4 rounded-full bg-${property.status}-500 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:w-5 hover:h-5 transition-all`}
          style={{ left: `${(property.lng + 180) * (100 / 360)}%`, top: `${(90 - property.lat) * (100 / 180)}%` }}
          onClick={() => handlePropertyClick(property)}
        />
      ))}
    </div>
  )

  const renderParkAnalysis = () => (
    <Card>
      <CardHeader>
        <CardTitle>Analyse du parc</CardTitle>
        <CardDescription>Vue d'ensemble des performances du parc</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Répartition des statuts</h4>
            <div className="space-y-2">
              {['green', 'yellow', 'orange', 'red'].map((status) => (
                <div key={status} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full bg-${status}-500 mr-2`} />
                  <span className="text-sm">{status === 'green' ? 'Aucun sinistre' : status === 'yellow' ? 'Sinistre traité' : status === 'orange' ? 'Sinistre en cours' : 'Sinistre récent'}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Statistiques</h4>
            <ul className="space-y-1 text-sm">
              <li>Nombre total de propriétés : 4</li>
              <li>Propriétés avec sinistres actifs : 2</li>
              <li>Taux de résolution des sinistres : 75%</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Évolution des sinistres</h4>
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Graphique d'évolution des sinistres</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderPropertyDashboard = () => (
    selectedProperty && (
      <Card>
        <CardHeader>
          <CardTitle>{selectedProperty.name}</CardTitle>
          <CardDescription>Détails et statistiques de la propriété</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Informations générales</h4>
              <ul className="space-y-1 text-sm">
                <li>Statut : <span className={`text-${selectedProperty.status}-500`}>{selectedProperty.status === 'green' ? 'Aucun sinistre' : selectedProperty.status === 'yellow' ? 'Sinistre traité' : selectedProperty.status === 'orange' ? 'Sinistre en cours' : 'Sinistre récent'}</span></li>
                <li>Adresse : 123 Rue Example, 75000 Paris</li>
                <li>Surface : 150 m²</li>
                <li>Année de construction : 1998</li>
                <li>Valeur estimée : 750 000 €</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Historique des sinistres</h4>
              <ul className="space-y-1 text-sm">
                <li>Dernier sinistre : 15/03/2024</li>
                <li>Nombre total de sinistres : 3</li>
                <li>Coût total des sinistres : 25 000 €</li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Analyse des risques</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm">Risque d'inondation : Moyen</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm">Risque d'incendie : Faible</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm">Risque de cambriolage : Élevé</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recommandations</h4>
            <ul className="space-y-1 text-sm list-disc list-inside">
              <li>Installer un système d'alarme anti-intrusion</li>
              <li>Mettre à jour le système de détection d'incendie</li>
              <li>Vérifier l'étanchéité des fenêtres et des portes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion du Parc</h2>
        <Select value={selectedPark} onValueChange={setSelectedPark}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner un parc" />
          </SelectTrigger>
          <SelectContent>
            {parks.map((park) => (
              <SelectItem key={park.id} value={park.id}>
                {park.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="carte">Carte</TabsTrigger>
          <TabsTrigger value="analyse">Analyse du parc</TabsTrigger>
          <TabsTrigger value="propriete">Détails de la propriété</TabsTrigger>
        </TabsList>
        <TabsContent value="carte">
          {renderMap()}
        </TabsContent>
        <TabsContent value="analyse">
          {renderParkAnalysis()}
        </TabsContent>
        <TabsContent value="propriete">
          {renderPropertyDashboard()}
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total des propriétés", value: "42", change: "+2", icon: BarChart },
          { title: "Sinistres actifs", value: "7", change: "-1", icon: AlertTriangle },
          { title: "Taux de résolution", value: "95%", change: "+2%", icon: Shield },
          { title: "Valeur totale du parc", value: "28M €", change: "+1.2M €", icon: BarChart }
        ].map(({ title, value, change, icon: Icon }) => (
          <Card key={title} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
              <Icon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {change}
                </span> par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}