'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart, Bell, Camera, FileText, Home, MessageSquare, Menu, PieChart, Settings, Shield, Sliders, Users, X, MapPin } from "lucide-react"
import { CameraInterface } from './camera-interface'
import { ParcInterface } from './parc-interface'
import { ClientsInterface } from './clients-interface'
import IoTAlertMonitoring from './iot-interface' // Mise à jour de l'importation

export default function ClaimSharkDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCameraInterfaceOpen, setIsCameraInterfaceOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("apercu")

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleCameraInterface = () => setIsCameraInterfaceOpen(!isCameraInterfaceOpen)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-4 bg-white shadow-sm md:px-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <PieChart className="w-6 h-6 text-blue-600 md:w-8 md:h-8" />
          <h1 className="text-lg font-bold text-gray-800 md:text-2xl">ClaimShark</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="outline" size="icon" className="text-gray-600 hover:text-blue-600" onClick={toggleCameraInterface}>
            <Camera className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="text-gray-600 hover:text-blue-600">
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@utilisateur" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">utilisateur</p>
                  <p className="text-xs leading-none text-muted-foreground">utilisateur@exemple.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-10 w-64 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="flex justify-between items-center p-4 md:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {[
              { icon: Home, label: "Tableau de bord", value: "apercu" },
              { icon: BarChart, label: "Analyses", value: "analyses" },
              { icon: Users, label: "Clients", value: "clients" },
              { icon: AlertTriangle, label: "Alertes IoT", value: "alertes" },
              { icon: Sliders, label: "Prédiction des coûts", value: "prediction" },
              { icon: Shield, label: "Détection de fraude", value: "fraude" },
              { icon: MapPin, label: "Parc", value: "parc" },
              { icon: FileText, label: "Rapports", value: "rapports" },
              { icon: MessageSquare, label: "Assistant IA", value: "assistant" },
              { icon: Settings, label: "Paramètres", value: "parametres" }
            ].map(({ icon: Icon, label, value }) => (
              <Button
                key={value}
                variant="ghost"
                className={`justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50 ${selectedTab === value ? 'bg-blue-50 text-blue-600' : ''}`}
                onClick={() => setSelectedTab(value)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className={`flex-1 p-4 md:p-6 overflow-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : ''}`}>
          {selectedTab === "parc" ? (
        <ParcInterface />
      ) : selectedTab === "clients" ? (
        <ClientsInterface />
      ) : selectedTab === "alertes" ? (
        <IoTAlertMonitoring />
          ) : (
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
              <TabsList className="bg-white p-1 rounded-lg shadow-sm overflow-x-auto">
                <TabsTrigger value="apercu" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Aperçu</TabsTrigger>
                <TabsTrigger value="analyses" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Analyses</TabsTrigger>
                <TabsTrigger value="risques" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Gestion des risques</TabsTrigger>
              </TabsList>
              <TabsContent value="apercu" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: "Total des réclamations", value: "1 284", change: "+20,1%", icon: BarChart },
                    { title: "Temps de traitement moyen", value: "3,2 jours", change: "-14%", icon: Users },
                    { title: "Taux de détection de fraude", value: "98,2%", change: "+2,1%", icon: Shield },
                    { title: "Réclamations actives", value: "573", change: "+201", icon: BarChart }
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
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">Classification des réclamations</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Image
                        src="/placeholder.svg?height=300&width=600"
                        width={600}
                        height={300}
                        alt="Graphique de classification des réclamations"
                        className="rounded-md object-cover w-full"
                      />
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">Réclamations récentes</CardTitle>
                      <CardDescription>Vous avez 3 nouvelles réclamations cette semaine.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left font-medium p-2 text-gray-600">ID Réclamation</th>
                              <th className="text-left font-medium p-2 text-gray-600">Statut</th>
                              <th className="text-left font-medium p-2 text-gray-600">Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: "#1234", status: "Approuvé", statusColor: "green", amount: "1 234,56 €" },
                              { id: "#5678", status: "En attente", statusColor: "yellow", amount: "2 345,67 €" },
                              { id: "#9012", status: "Rejeté", statusColor: "red", amount: "3 456,78 €" }
                            ].map(({ id, status, statusColor, amount }) => (
                              <tr key={id} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="p-2 text-gray-800">{id}</td>
                                <td className="p-2">
                                  <span className={`inline-flex items-center rounded-full bg-${statusColor}-50 px-2 py-1 text-xs font-medium text-${statusColor}-700 ring-1 ring-inset ring-${statusColor}-600/20`}>
                                    {status}
                                  </span>
                                </td>
                                <td className="p-2 text-gray-800">{amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analyses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Détection de fraude</CardTitle>
                    <CardDescription>Analyse de fraude alimentée par l'IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      width={600}
                      height={300}
                      alt="Graphique de détection de fraude"
                      className="rounded-md object-cover mb-4 w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>Réclamations suspectes détectées : <span className="font-semibold text-gray-800">23</span></p>
                      <p>Taux de faux positifs : <span className="font-semibold text-gray-800">0,5%</span></p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="risques" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Évaluation des risques</CardTitle>
                    <CardDescription>Analyse et prévention des risques alimentées par l'IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      width={600}
                      height={300}
                      alt="Graphique d'évaluation des risques"
                      className="rounded-md object-cover mb-4 w-full"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-2">Zones à haut risque</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-red-500" />Bâtiment A - Risque d'inondation</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />Bâtiment C - Risque d'incendie</li>
                          <li className="flex items-center"><AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />Bâtiment B - Problèmes structurels</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-2">Actions recommandées</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-500" />Améliorer le système de drainage du Bâtiment A</li>
                          <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-500" />Mettre à jour l'équipement de sécurité incendie du Bâtiment C</li>
                          <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-500" />Planifier une inspection structurelle pour le Bâtiment B</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
      {isCameraInterfaceOpen && <CameraInterface onClose={() => setIsCameraInterfaceOpen(false)} />}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:justify-between">
          <p className="text-sm text-gray-600">
            © 2024 ClaimShark. All rights reserved.
          </p>
          <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50">
            <MessageSquare className="w-4 h-4 mr-2" />
            Discuter avec l'assistant IA
          </Button>
        </div>
      </footer>
    </div>
  )
}