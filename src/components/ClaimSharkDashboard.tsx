import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, BarChart, Bell, Camera, ChevronDown, FileText, Home, MessageSquare, PieChart, Settings, Shield, Sliders, Users } from "lucide-react"

export default function ClaimSharkDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <PieChart className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">ClaimShark</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="text-gray-600 hover:text-blue-600">
            <Camera className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="text-gray-600 hover:text-blue-600">
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://via.placeholder.com/600x300" alt="@utilisateur" />
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
      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r border-gray-200">
          <nav className="flex flex-col p-4 space-y-2">
            {[
              { icon: Home, label: "Tableau de bord" },
              { icon: BarChart, label: "Analyses" },
              { icon: Users, label: "Clients" },
              { icon: AlertTriangle, label: "Alertes IoT" },
              { icon: Sliders, label: "Prédiction des coûts" },
              { icon: Shield, label: "Détection de fraude" },
              { icon: FileText, label: "Rapports" },
              { icon: MessageSquare, label: "Assistant IA" },
              { icon: Settings, label: "Paramètres" }
            ].map(({ icon: Icon, label }) => (
              <Button key={label} variant="ghost" className="justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="apercu" className="space-y-4">
            <TabsList className="bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger value="apercu" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Aperçu</TabsTrigger>
              <TabsTrigger value="analyses" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Analyses</TabsTrigger>
              <TabsTrigger value="risques" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Gestion des risques</TabsTrigger>
            </TabsList>
            <TabsContent value="apercu" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">Classification des réclamations</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Image
                      src="/api/placeholder/600/300"
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
                    src="/api/placeholder/600/300"
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
                    src="/api/placeholder/600/300"
                    width={600}
                    height={300}
                    alt="Graphique d'évaluation des risques"
                    className="rounded-md object-cover mb-4 w-full"
                  />
                  <div className="grid grid-cols-2 gap-4">
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
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © 2023 ClaimShark. All rights reserved.
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