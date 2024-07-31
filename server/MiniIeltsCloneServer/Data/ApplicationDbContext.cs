using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Data.Seeding;
using MiniIeltsCloneServer.Models;

namespace MiniIeltsCloneServer.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Excercise> Excercises { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<ExerciseChoice> ExerciseChoices { get; set; }
        public DbSet<QuestionChoice> QuestionChoices { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Test>()
                .HasMany(t => t.Excercises)
                .WithOne(e => e.Test)
                .HasForeignKey(e => e.TestId);

            builder.Entity<Excercise>()
                .HasMany(e => e.Questions)
                .WithOne(q => q.Excercise)
                .HasForeignKey(q => q.ExerciseId);

            builder.Entity<Excercise>()
                .HasMany(e => e.ChooseManyChoices)
                .WithOne(c => c.Excercise)
                .HasForeignKey(c => c.ExerciseId);

            builder.Entity<Question>()
                .HasMany(q => q.Choices)
                .WithOne(c => c.Question)
                .HasForeignKey(c => c.QuestionId);


        }
    }
}
