using System.Data.Common;

namespace ESchool.Models.Abstract
{
    public interface IDBService
    {
        string ConnectionString { get; }

        /// <summary>
        /// Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        void UseConnection(Action<DbConnection> action);

        /// <summary>
        /// Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        T UseConnection<T>(Func<DbConnection, T> action);

        /// <summary>
        /// (Асинхронно) Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        Task UseConnectionAsync(Action<DbConnection> action);

        /// <summary>
        /// (Асинхронно) Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        Task<T> UseConnectionAsync<T>(Func<DbConnection, Task<T>> action, string ConnectionString = null);

        /// <summary>
        /// Открыть соединение
        /// </summary>
        /// <returns>Объект соедниение с БД</returns>
        DbConnection OpenConnection();

        /// <summary>
        /// (Асинхронно) Открыть соединение
        /// </summary>
        /// <returns>Объект соедниение с БД</returns>
        Task<DbConnection> OpenConnectionAsync(string OtherConnectionString = null);
    }
}
