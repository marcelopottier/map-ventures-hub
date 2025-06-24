
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Building, ArrowLeft } from 'lucide-react'
import { companiesApi } from '@/services/mockApi'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

const companySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  website: z.string().url('Website deve ser uma URL válida'),
  address: z.string().min(10, 'Endereço deve ter pelo menos 10 caracteres'),
  employees: z.string().min(1, 'Número de funcionários é obrigatório'),
  founded: z.number().min(1900, 'Ano de fundação deve ser válido').max(new Date().getFullYear()),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
})

type CompanyFormData = z.infer<typeof companySchema>

export default function CompanyForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const isEditing = !!id
  const isMyCompany = user?.companyId === id

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      phone: '',
      website: '',
      address: '',
      employees: '',
      founded: new Date().getFullYear(),
      lat: -26.3044,
      lng: -48.8487
    }
  })

  // Buscar dados da empresa se estiver editando
  const { data: company, isLoading } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companiesApi.getById(id!),
    enabled: isEditing
  })

  // Preencher formulário com dados existentes
  useEffect(() => {
    if (company && isEditing) {
      form.reset({
        name: company.name,
        description: company.description,
        category: company.category,
        phone: company.phone,
        website: company.website,
        address: company.address,
        employees: company.employees,
        founded: company.founded,
        lat: company.lat,
        lng: company.lng
      })
    }
  }, [company, isEditing, form])

  // Mutation para criar/atualizar empresa
  const mutation = useMutation({
    mutationFn: async (data: CompanyFormData) => {
      if (isEditing) {
        return companiesApi.update(id!, data)
      } else {
        // Garantir que todos os campos obrigatórios estão presentes
        const companyData = {
          name: data.name,
          description: data.description,
          category: data.category,
          phone: data.phone,
          website: data.website,
          address: data.address,
          employees: data.employees,
          founded: data.founded,
          lat: data.lat,
          lng: data.lng,
          ownerId: user!.id
        }
        return companiesApi.create(companyData)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      queryClient.invalidateQueries({ queryKey: ['company', id] })
      
      toast({
        title: "Sucesso!",
        description: `Empresa ${isEditing ? 'atualizada' : 'criada'} com sucesso.`
      })
      
      navigate('/companies')
    },
    onError: () => {
      toast({
        title: "Erro!",
        description: `Erro ao ${isEditing ? 'atualizar' : 'criar'} empresa.`,
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: CompanyFormData) => {
    mutation.mutate(data)
  }

  if (isEditing && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/companies')}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building className="h-8 w-8 text-company-blue" />
            {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? 'Atualize as informações da sua empresa' : 'Cadastre sua empresa na plataforma'}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: TechJoinville Solutions" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Tecnologia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva sua empresa, seus serviços e diferenciais..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(47) 3422-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua, número - Bairro, Cidade - Estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funcionários</FormLabel>
                      <FormControl>
                        <Input placeholder="1-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="founded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano de Fundação</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2020"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="any"
                          placeholder="-26.3044"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="any"
                          placeholder="-48.8487"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/companies')}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="flex-1"
                >
                  {mutation.isPending ? 'Salvando...' : (isEditing ? 'Atualizar Empresa' : 'Criar Empresa')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
