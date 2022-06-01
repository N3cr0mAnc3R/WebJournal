using System.Data.Common;

namespace ESchool.Models.Abstract
{
    public class DBService: IDBService
    {
        protected DbProviderFactory Factory { get; set; }
        public string ConnectionString { get; protected set; }
        protected IConfiguration config;
        public DBService(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("DefaultConnection");
            string providerName = "System.Data.SqlClient";
            config = configuration;

            Factory = DbProviderFactories.GetFactory(providerName);
            ConnectionString = connectionString;
        }

        /// <summary>
        /// Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        public void UseConnection(Action<DbConnection> action)
        {
            using (var connection = OpenConnection())
            {
                action(connection);
            }
        }

        /// <summary>
        /// Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        public T UseConnection<T>(Func<DbConnection, T> action)
        {
            using (var connection = OpenConnection())
            {
                return action(connection);
            }
        }

        /// <summary>
        /// (Асинхронно) Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        public async Task UseConnectionAsync(Action<DbConnection> action)
        {
            //using (var connection = await OpenConnectionAsync())
            // {
            using var connection = await OpenConnectionAsync();


            action(connection);
            //}
        }

        /// <summary>
        /// (Асинхронно) Выполнить действие с БД и закрыть соединение
        /// </summary>
        /// <param name="action">Обработчик</param>
        public async Task<T> UseConnectionAsync<T>(Func<DbConnection, Task<T>> action, string ConnectionString = null)
        {
            using (var connection = await OpenConnectionAsync(ConnectionString))
            {
                return await action(connection);
            }
        }

        /// <summary>
        /// Открыть соединение
        /// </summary>
        /// <returns>Объект соедниение с БД</returns>
        public DbConnection OpenConnection()
        {
            DbConnection cnt = Factory.CreateConnection();
            cnt.ConnectionString = ConnectionString;
            cnt.Open();

            return cnt;
        }

        /// <summary>
        /// (Асинхронно) Открыть соединение
        /// </summary>
        /// <returns>Объект соедниение с БД</returns>
        public async Task<DbConnection> OpenConnectionAsync(string OtherConnectionString = null)
        {
            DbConnection cnt = Factory.CreateConnection();
            cnt.ConnectionString = OtherConnectionString == null ? ConnectionString : config.GetConnectionString(OtherConnectionString);

            await cnt.OpenAsync();

            return cnt;
        }
    }
}
