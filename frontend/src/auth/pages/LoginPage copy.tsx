import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrintIcon, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import { Navbar } from "@/components";

export default function LoginPage2() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = localStorage.getItem("user");

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        setLoading(false);
        navigate("/dashboard", { replace: true });
      } else {
        setError("Usuario no encontrado. Por favor regístrate primero.");
        setLoading(false);
      }
    }, 1000);
  };

  const navigate = useNavigate();
  return (
    <div className=" flex  flex-col h-screen w-full">
      <div className="flex flex-col space-y-2 text-center items-center justify-center py-5">
        <Card className="w-1/3">
          <CardHeader>
            <Link to="/" className=" relative -left-2 -top-2 sm:top-0  ">
              <Button variant="ghost" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div className="flex gap-3 items-center justify-center text-center ">
              <PawPrintIcon className="h-8 w-8 text-rose-500" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Registrarse
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600"
                disabled={loading}
              >
                {loading ? "Procesando..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Registrarse
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
