using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MiniIeltsCloneServer.Constants;
using MiniIeltsCloneServer.Data.Seeding;
using MiniIeltsCloneServer.Models;
using MiniIeltsCloneServer.Models.Listening;

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
        public DbSet<FullTest> FullTests { get; set; }
        public DbSet<FullTestResult> FullTestResults { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<SeriesFullTest> SeriesFullTests { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Explanation> Explanations { get; set; }
        public DbSet<ListeningExercise> ListeningExercises { get; set; }
        public DbSet<ListeningPart> ListeningParts { get; set; }
        public DbSet<ListeningTest> ListeningTests { get; set; }
        public DbSet<SeriesListeningTest> SeriesListeningTests { get; set; }
        public DbSet<ListeningResult> ListeningResults { get; set; }


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

            builder.Entity<Test>()
                .HasMany(t => t.Results)
                .WithOne(e => e.Test)
                .HasForeignKey(q => q.TestId);

            builder.Entity<Result>()
                .HasMany(t => t.Answers)
                .WithOne(a => a.Result)
                .HasForeignKey(a => a.ResultId)
                .IsRequired(false);
            
            builder.Entity<FullTest>()
                .HasMany(f => f.Tests)
                .WithOne(t => t.FullTest)
                .HasForeignKey(t => t.FullTestId)
                .IsRequired(false);

            builder.Entity<FullTest>()
                .HasMany(t => t.FullTestResults)
                .WithOne(f => f.FullTest)
                .HasForeignKey(t => t.FullTestId);

            builder.Entity<FullTestResult>()
                .HasMany(t => t.Results)
                .WithOne(t => t.FullTestResult)
                .HasForeignKey(t => t.FullTestResultId)
                .IsRequired(false);

            builder.Entity<SeriesFullTest>()
                .HasKey(s => new {s.SeriesId, s.FullTestId});

            builder.Entity<SeriesFullTest>()
                .HasOne(s => s.Series)
                .WithMany(s => s.SeriesFullTests)
                .HasForeignKey(s => s.SeriesId);

            builder.Entity<SeriesFullTest>()
                .HasOne(s => s.FullTest)
                .WithMany(f => f.SeriesFullTests)
                .HasForeignKey(f => f.FullTestId);

            builder.Entity<Post>()
            .OwnsMany(p => p.Ratings, rating =>
            {
                rating.WithOwner(r => r.Post).HasForeignKey(r => r.PostId);
            });

            builder.Entity<Question>()
                .HasOne(q => q.Explanation)
                .WithOne(e => e.Question)
                .HasForeignKey<Explanation>(a => a.QuestionId)
                .IsRequired()
                ;

            builder.Entity<ListeningTest>()
                .HasMany(lt => lt.ListeningParts)
                .WithOne(lp => lp.ListeningTest)
                .HasForeignKey(lp => lp.ListeningTestId)
                .IsRequired();

            builder.Entity<ListeningPart>()
                .HasMany(lp => lp.ListeningExercises)
                .WithOne(e => e.ListeningPart)
                .HasForeignKey(e => e.ListeningPartId)
                .IsRequired();

            builder.Entity<ListeningExercise>()
                .HasMany(le => le.Questions)
                .WithOne(q => q.ListeningExercise)
                .HasForeignKey(q => q.ListeningExerciseId)
                .IsRequired(false);
            
            builder.Entity<ListeningExercise>()
                .HasMany(le => le.ChooseManyChoices)
                .WithOne(cmc => cmc.ListeningExercise)
                .HasForeignKey(cmc => cmc.ListeningExerciseId)
                .IsRequired(false);

            builder.Entity<SeriesListeningTest>()
                .HasKey(s => new {s.SeriesId, s.ListeningTestId});

            builder.Entity<SeriesListeningTest>()
                .HasOne(s => s.Series)
                .WithMany(s => s.SeriesListeningTests)
                .HasForeignKey(s => s.SeriesId);

            builder.Entity<SeriesListeningTest>()
                .HasOne(s => s.ListeningTest)
                .WithMany(f => f.SeriesListeningTests)
                .HasForeignKey(f => f.ListeningTestId);

            builder.Entity<ListeningResult>()
                .HasMany(lr => lr.Answers)
                .WithOne(a => a.ListeningResult)
                .HasForeignKey(a => a.ListeningResultId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            
            builder.Entity<ListeningTest>()
                .HasMany(lt => lt.ListeningResults)
                .WithOne(lr => lr.ListeningTest)
                .HasForeignKey(lr => lr.ListeningTestId);

        }
    }
}
