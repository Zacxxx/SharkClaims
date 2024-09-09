import React, { useState, useCallback } from 'react'
import ReactDOMServer from 'react-dom/server'
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart, Shield, ChevronRight, Plus, Maximize2, Minimize2, Home, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts'

interface Apartment {
  id: number;
  number: string;
  surface: number;
  risks: string[];
}

interface Property {
  id: number;
  name: string;
  status: 'green' | 'yellow' | 'orange' | 'red';
  lat: number;
  lng: number;
  type: 'property' | 'point_of_interest';
  parkId: string;
  address: string;
  apartments: Apartment[];
  incidentHistory: string[];
}

interface Park {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
}

const parks: Park[] = [
  { id: "all", name: "Tous les parcs", center: [48.8566, 2.3522], zoom: 12 },
  { id: "park1", name: "Parc A", center: [48.8584, 2.2945], zoom: 14 },
  { id: "park2", name: "Parc B", center: [48.8738, 2.2950], zoom: 14 },
  { id: "park3", name: "Parc C", center: [48.8619, 2.3324], zoom: 14 },
]

const properties: Property[] = [
  { 
    id: 1, 
    name: "Propriété 1", 
    status: "green", 
    lat: 48.8566, 
    lng: 2.3522, 
    type: "property", 
    parkId: "park1",
    address: "123 Rue de Paris, 75001 Paris",
    apartments: [
      { id: 1, number: "A101", surface: 50, risks: ["Inondation"] },
      { id: 2, number: "A102", surface: 75, risks: ["Incendie"] },
    ],
    incidentHistory: ["10/01/2024: Fuite d'eau mineure", "15/03/2024: Réparation électrique"]
  },
  // Ajoutez d'autres propriétés ici...
]

const generateChartData = () => {
  return [
    { name: 'Jan', value: Math.floor(Math.random() * 100) },
    { name: 'Feb', value: Math.floor(Math.random() * 100) },
    { name: 'Mar', value: Math.floor(Math.random() * 100) },
    { name: 'Apr', value: Math.floor(Math.random() * 100) },
    { name: 'May', value: Math.floor(Math.random() * 100) },
    { name: 'Jun', value: Math.floor(Math.random() * 100) },
  ];
};

export function ParcInterface() {
  const [selectedPark, setSelectedPark] = useState<string>("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [activeTab, setActiveTab] = useState<string>("carte")
  const [showAddForm, setShowAddForm] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [chartData, setChartData] = useState(generateChartData())

  const handlePropertyClick = useCallback((property: Property) => {
    setSelectedProperty(property)
  }, [])

  const getMarkerIcon = useCallback((status: string, type: string) => {
    const color = status === 'green' ? '#10B981' : status === 'yellow' ? '#FBBF24' : status === 'orange' ? '#F97316' : '#EF4444';
    const Icon = type === 'property' ? Home : MapPin;

    const iconHtml = ReactDOMServer.renderToString(
      <Icon color={color} size={24} />
    );

    return L.divIcon({
      className: `custom-icon ${status}`,
      html: iconHtml,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
  }, [])

  const renderMap = useCallback(() => {
    const currentPark = parks.find(park => park.id === selectedPark) || parks[0];
    return (
      <div className={`relative ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
        <MapContainer 
          center={currentPark.center} 
          zoom={currentPark.zoom} 
          style={{ height: isFullScreen ? '100vh' : '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties
            .filter(p => selectedPark === 'all' || p.parkId === selectedPark)
            .map((property) => (
              <Marker
                key={property.id}
                position={[property.lat, property.lng]}
                icon={getMarkerIcon(property.status, property.type)}
                eventHandlers={{
                  click: () => handlePropertyClick(property),
                }}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                  <div>
                    <strong>{property.name}</strong><br />
                    Type: {property.type === 'property' ? 'Propriété' : 'Point d\'intérêt'}<br />
                    Statut: {property.status}
                  </div>
                </Tooltip>
                <Popup>{property.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
        <Button 
          className="absolute top-2 right-2 z-[1000]"
          onClick={() => setIsFullScreen(!isFullScreen)}
        >
          {isFullScreen ? <Minimize2 /> : <Maximize2 />}
        </Button>
      </div>
    )
  }, [selectedPark, isFullScreen, properties, handlePropertyClick, getMarkerIcon])

  const renderPropertyDashboard = useCallback(() => (
    selectedProperty && (
      <Card>
        <CardHeader>
          <CardTitle>{selectedProperty.name}</CardTitle>
          <CardDescription>
            {selectedProperty.type === 'property' ? 'Détails et statistiques de la propriété' : 'Informations sur le point d\'intérêt'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Informations générales</h4>
              <ul className="space-y-1 text-sm">
                <li>Type : {selectedProperty.type === 'property' ? 'Propriété' : 'Point d\'intérêt'}</li>
                <li>Statut : <span className={`text-${selectedProperty.status}-500`}>
                  {selectedProperty.status === 'green' ? 'Aucun problème' : 
                   selectedProperty.status === 'yellow' ? 'Attention requise' : 
                   selectedProperty.status === 'orange' ? 'Problème en cours' : 'Problème critique'}
                </span></li>
                <li>Adresse : {selectedProperty.address}</li>
                <li>Parc : {parks.find(p => p.id === selectedProperty.parkId)?.name}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Appartements</h4>
              <ul className="space-y-1 text-sm">
                {selectedProperty.apartments.map(apt => (
                  <li key={apt.id}>
                    {apt.number} - {apt.surface}m² - Risques : {apt.risks.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Historique des incidents</h4>
            <ul className="space-y-1 text-sm">
              {selectedProperty.incidentHistory.map((incident, index) => (
                <li key={index}>{incident}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  ), [selectedProperty])

  const renderParkAnalysis = useCallback(() => (
    <Card>
      <CardHeader>
        <CardTitle>Analyse du parc</CardTitle>
        <CardDescription>Vue d'ensemble des performances du parc</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={chartType} onValueChange={(value: 'line' | 'bar') => setChartType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Type de graphique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Ligne</SelectItem>
              <SelectItem value="bar">Barre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            {chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            ) : (
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </RechartsBarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  ), [chartType, chartData])

  const renderQuickList = useCallback(() => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Liste rapide des éléments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {properties
            .filter(p => selectedPark === 'all' || p.parkId === selectedPark)
            .map((property) => (
              <div 
                key={property.id} 
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div>
                  <span className={`inline-block w-3 h-3 rounded-full bg-${property.status}-500 mr-2`}></span>
                  {property.name}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  {property.type === 'property' ? 'Propriété' : 'Point d\'intérêt'}
                  <span className="mx-2">|</span>
                  {parks.find(p => p.id === property.parkId)?.name}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  ), [properties, selectedPark, handlePropertyClick])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion du Parc</h2>
        <div className="flex space-x-2">
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
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un élément
          </Button>
        </div>
      </div>

                      {showAddForm && (
                              <Card>
                                <CardHeader>
                                  <CardTitle>Ajouter un nouvel élément</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <form onSubmit={(e) => { e.preventDefault(); /* Logique d'ajout */ }}>
                                    <div className="space-y-4">
                                      <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                                        <Input id="name" placeholder="Nom de l'élément" />
                                      </div>
                                      <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                                        <Input id="address" placeholder="Adresse complète" />
                                      </div>
                                      <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="property">Propriété</SelectItem>
                                            <SelectItem value="point_of_interest">Point d'intérêt</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label htmlFor="incidents" className="block text-sm font-medium text-gray-700">Historique des sinistres</label>
                                        <Textarea id="incidents" placeholder="Détaillez l'historique des sinistres" />
                                      </div>
                                      <Button type="submit">Ajouter l'élément</Button>
                                    </div>
                                  </form>
                                </CardContent>
                              </Card>
                            )}

                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                              <TabsList>
                                <TabsTrigger value="carte">Carte</TabsTrigger>
                                <TabsTrigger value="analyse">Analyse du parc</TabsTrigger>
                              </TabsList>
                              <TabsContent value="carte">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>{renderMap()}</div>
                                  <div>{selectedProperty ? renderPropertyDashboard() : (
                                    <Card>
                                      <CardContent className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">Sélectionnez un élément sur la carte pour voir les détails</p>
                                      </CardContent>
                                    </Card>
                                  )}</div>
                                </div>
                              </TabsContent>
                              <TabsContent value="analyse">
                                {renderParkAnalysis()}
                              </TabsContent>
                            </Tabs>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {[
                                { 
                                  title: "Total des éléments", 
                                  value: properties.filter(p => selectedPark === 'all' || p.parkId === selectedPark).length.toString(), 
                                  change: "+3", 
                                  icon: BarChart 
                                },
                                { 
                                  title: "Problèmes actifs", 
                                  value: properties.filter(p => (selectedPark === 'all' || p.parkId === selectedPark) && p.status !== 'green').length.toString(), 
                                  change: "-1", 
                                  icon: AlertTriangle 
                                },
                                { 
                                  title: "Taux de conformité", 
                                  value: "85%", 
                                  change: "+2%", 
                                  icon: Shield 
                                },
                                { 
                                  title: "Valeur totale du parc", 
                                  value: "28M €", 
                                  change: "+1.2M €", 
                                  icon: BarChart 
                                }
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

                            {renderQuickList()}
                          </div>
                        )
                      }