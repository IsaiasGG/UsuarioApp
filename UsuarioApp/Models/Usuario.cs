using System;
using System.Collections.Generic;

namespace UsuarioApp.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public int? Edad { get; set; }
}
