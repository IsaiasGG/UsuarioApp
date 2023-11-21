using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using UsuarioApp.Models;

namespace UsuarioApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly DbapiusuarioContext _dbcontext;

        public UsuarioController(DbapiusuarioContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar(int pagina = 1, int elementosPorPagina = 10)
        {
            try
            {
                // Cálculos para la paginación
                int elementosAExcluir = (pagina - 1) * elementosPorPagina;

                // Obtiene datos paginados desde la base de datos
                List<Usuario> listaPaginada = await _dbcontext.Usuarios
                    .OrderByDescending(c => c.Id)
                    .Skip(elementosAExcluir)
                    .Take(elementosPorPagina)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, listaPaginada);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al listar los usuarios: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Usuario modelUser)
        {
            if (string.IsNullOrEmpty(modelUser.Nombre))
            {
                return BadRequest("El nombre es requerido.");
            }

            if (string.IsNullOrEmpty(modelUser.Correo) || !modelUser.Correo.Contains("@"))
            {
                return BadRequest("El correo no es válido.");
            }

            if (modelUser.Edad <= 0 || modelUser.Edad > 150)
            {
                return BadRequest("La edad debe ser un número válido.");
            }
            try
            {

                await _dbcontext.Usuarios.AddAsync(modelUser);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear el usuario: {ex.Message}");
            }

        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Usuario modelUser)
        {
            try
            {
                _dbcontext.Usuarios.Update(modelUser);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al Editar el usuario: {ex.Message}");
            }

        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int Id)
        {
            try
            {
                Usuario usuario = _dbcontext.Usuarios.Find(Id);

                _dbcontext.Usuarios.Remove(usuario);
                await _dbcontext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al Eliminar el usuario: {ex.Message}");
            }
        }
    }
}
